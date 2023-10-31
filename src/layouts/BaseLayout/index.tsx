import { Content, Footer, Header, Sidebar } from './components'

export default function BaseLayout() {
  const userStore = useUserStore()
  const sidebarStore = useSidebarStore()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)

  const userInfoQuery = useQuery({
    queryKey: ['CurrentUser'],
    queryFn: () => UserAPI.getUserInfo(),
    select: (res) => res.data,
    enabled: false
  })

  useEffect(() => {
    // 检查登录状态
    const checkLogin = async () => {
      // 如果有 token，获取用户信息
      if (AuthUtils.isAuthenticated()) {
        if (!userStore.hasData()) {
          const user = (await userInfoQuery.refetch()).data
          userStore.setUser(user ?? null)
        }
        setLoading(false)
      } else {
        // 否则清除用户信息并跳转到登录页
        userStore.clearUser()
        navigate(`/login?redirect=${window.location.pathname}`, {
          replace: true
        })
      }
    }
    checkLogin().catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <BaseGlobalLoading />
  }

  return (
    <ALayout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <ALayout
        style={{ marginLeft: sidebarStore.isCollapse ? 64 : 220 }}
        rootClassName="transition-all"
      >
        <Header />
        <Content />
        <Footer />
      </ALayout>
    </ALayout>
  )
}
