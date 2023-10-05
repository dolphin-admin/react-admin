import { menu } from '@/constants'

export default function BaseLayout(): React.JSX.Element {
  const { Header, Content, Footer, Sider } = Layout
  const { APP_NAME } = AppConfig

  const userStore = useUserStore()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

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
    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <BaseGlobalLoading />
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 2
        }}
        theme="light"
      >
        <div
          className="flex h-14 w-full select-none items-center justify-center"
          onClick={() => navigate('/')}
        >
          <img
            className="animate-pulse cursor-pointer select-none"
            width="36"
            height="36"
            src={AssetUtils.getImageFromAssets('favicon.png')}
            alt=""
            loading="eager"
          />
          <span
            className={clsx([
              'cursor-pointer whitespace-nowrap text-sm tracking-wide transition-all',
              collapsed ? 'hidden' : 'w-auto'
            ])}
          >
            {APP_NAME}
          </span>
        </div>

        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          items={menu}
          style={{ height: '100vh' }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#ffffff',
            position: 'sticky',
            top: 0,
            zIndex: 1
          }}
        />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 800,
              background: '#ffffff'
            }}
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  )
}
