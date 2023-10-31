export default function AuthLayout() {
  const navigate = useNavigate()
  const userStore = useUserStore()

  const checkLogin = () => {
    // 如果已经登录，直接跳转到首页，否则清除用户信息
    if (AuthUtils.isAuthenticated()) {
      navigate('/', { replace: true })
    } else {
      userStore.clearUser()
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  return (
    <main className="flex h-screen w-screen bg-blue-200 dark:bg-[#2f2f2f]">
      <div className="absolute inset-x-0 bottom-1/2">
        <Outlet />
      </div>
    </main>
  )
}
