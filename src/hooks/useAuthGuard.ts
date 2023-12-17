import { Lang } from '@dolphin-admin/utils'

import type { LocaleResource } from '@/types'

interface AuthGuardProps {
  /**
   * 是否跳过认证
   * @default false
   */
  skipAuth?: boolean
}

export const useAuthGuard = (props?: AuthGuardProps) => {
  const { skipAuth = false } = props ?? {}

  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const userStore = useUserStore()

  // 用户信息
  const userInfoQuery = useQuery({
    queryKey: [UserAPI.ME_QUERY_KEY],
    queryFn: () => UserAPI.me(),
    select: (data) => data.data,
    enabled: false // 不自动执行
  })

  const [isLoading, setIsLoading] = useState(true)

  useAsyncEffect(async () => {
    // 如果已经登录，直接跳转到首页，否则清除用户信息
    if (!AuthUtils.isAuthenticated()) {
      // 清除用户信息并跳转到登录页
      userStore.clearUser()
      if (!skipAuth) {
        navigate(`/login?redirect=${window.location.pathname}`, {
          replace: true
        })
      }
      setIsLoading(false)
      return
    }

    // 处理登录逻辑
    if (!userStore.hasData()) {
      const user = (await userInfoQuery.refetch()).data
      userStore.setUser(user ?? {})
    }
    // 如果跳过认证，直接跳转到首页
    if (skipAuth) {
      navigate('/', { replace: true })
    }
    // TODO: Use Tanstack Query
    // 处理当前页面语言
    processLocaleResources(i18n.language, (await LocaleAPI.getLocaleResources(i18n.language)).data)
    // 处理其他语言
    const restLangList = Object.values(Lang).filter((lang) => lang !== i18n.language)
    Promise.all(restLangList.map((lang) => LocaleAPI.getLocaleResources(lang))).then((res) => {
      res.forEach(({ data }, index) => processLocaleResources(restLangList[index], data))
    })

    setIsLoading(false)
  }, [])

  function processLocaleResources(lang: string, localeResources: LocaleResource[]) {
    localeResources.forEach(({ ns, resources }) =>
      // NOTE: i18n.addResources 不会工作，可能是由于 JSON 键前缀重合导致的
      i18n.addResourceBundle(lang, ns, resources, true, true)
    )
  }

  return { isLoading }
}
