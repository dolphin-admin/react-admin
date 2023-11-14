export default function AuthLayout() {
  const navigate = useNavigate()
  const userStore = useUserStore()

  useEffect(() => {
    checkLogin()
  }, [])

  function checkLogin() {
    // 如果已经登录，直接跳转到首页，否则清除用户信息
    if (AuthUtils.isAuthenticated()) {
      navigate('/', { replace: true })
    } else {
      userStore.clearUser()
    }
  }

  return (
    <main className="flex h-screen w-screen bg-[#badfff] dark:bg-[#444444]">
      <Outlet />
    </main>
  )
}
