export default function BaseLayout(): React.JSX.Element {
  const userStore = useUserStore()
  const navigate = useNavigate()

  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 检查登录状态
    const checkLogin = () => {
      // 如果有 token，获取用户信息
      if (AuthUtils.isAuthenticated()) {
        if (!userStore.hasData()) {
          // const { data } = (await UserAPI.getUserInfo()) || {}
          userStore.setUser({})
        }
        // setLoading(false)
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

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-x-20 top-6 m-auto h-fit">
        <BaseHeader />
      </div>
      <Outlet />
    </div>
  )
}
