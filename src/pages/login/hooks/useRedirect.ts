export const useRedirect = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const handleRedirect = () => {
    // 跳转到登录前的页面
    if (searchParams.get('redirect')) {
      navigate(searchParams.get('redirect')!, { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }

  // 忘记密码
  const handleForgotPassword = () => navigate('/forgot-password')

  // 注册
  const handleSignup = () => navigate('/signup')

  return { handleRedirect, handleForgotPassword, handleSignup }
}
