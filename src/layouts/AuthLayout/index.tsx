export default function AuthLayout(): React.JSX.Element {
  const { VERSION, APP_NAME } = AppConfig
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => checkLogin(), [])

  return (
    <main className="flex h-screen w-screen">
      <div className="invisible relative w-0 bg-blue-200 dark:bg-gray-600 sm:visible sm:w-1/2">
        <div className="absolute inset-0 m-auto flex h-fit w-fit select-none flex-col space-y-2 text-center font-mono">
          <img
            className="cursor-pointer transition-all duration-300 hover:scale-125"
            src={AssetUtils.getImageFromAssets('favicon.png')}
            alt=""
            width="300"
            height="300"
            loading="eager"
          />
          <span className="text-xl font-semibold">{APP_NAME}</span>
          <span className="text-base">v{VERSION}</span>
        </div>
      </div>

      <div className="relative w-full bg-blue-300 dark:bg-gray-500 sm:w-1/2">
        <Outlet />
      </div>
    </main>
  )
}
