import { useProfileQuery } from '@/features/users'

interface AuthGuardProps {
  /**
   * 是否跳过认证
   * @default false
   */
  skipAuth?: boolean
}

export const useAuthGuard = (props?: AuthGuardProps) => {
  const { skipAuth = false } = props ?? {}

  const navigate = useNavigate()
  const userStore = useUserStore()

  const [isLoading, setIsLoading] = useState(true)

  const profileQuery = useProfileQuery({ enabled: AuthUtils.isAuthenticated() })

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

    // 如果跳过认证，直接跳转到首页
    if (skipAuth) {
      navigate('/', { replace: true })
    }
  }, [])

  useEffect(() => {
    if (profileQuery.isSuccess) {
      setIsLoading(false)
    }
  }, [profileQuery.isSuccess])

  return { isLoading }
}
