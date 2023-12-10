import { UserNameLoginType } from '../enum'
import type { LoginFormData } from '../types'

export const useLoginForm = () => {
  const [form] = AForm.useForm<LoginFormData>()

  useEffect(() => {
    // 从 localStorage 中获取记住的账号密码
    const localStorageData = AuthUtils.getRememberedAccount()
    if (localStorageData) {
      try {
        const data = JSON.parse(localStorageData) as LoginFormData
        form.setFieldsValue(data)
      } catch {
        //
      }
    }
  }, [form])

  // 清空密码
  const clearPassword = () => form.setFieldValue('password', '')

  // 设置管理员账号密码
  const setAdminAccount = () =>
    form.setFieldsValue({
      username: AuthUtils.DEFAULT_ADMIN_USERNAME,
      password: AuthUtils.DEFAULT_ADMIN_PASSWORD
    })

  // 设置访客账号密码
  const setVisitorAccount = () =>
    form.setFieldsValue({
      username: AuthUtils.DEFAULT_VISITOR_USERNAME,
      password: AuthUtils.DEFAULT_VISITOR_PASSWORD
    })

  // 处理不同登录方式
  const handleAutoComplete = (type: UserNameLoginType) => {
    switch (type) {
      // 管理员登录
      case UserNameLoginType.ADMIN:
        setAdminAccount()
        break
      // 访客登录
      case UserNameLoginType.VISITOR:
        setVisitorAccount()
        break
      // 普通登录
      case UserNameLoginType.BASIC:
      default:
        break
    }
  }

  // 处理记住密码
  const handleRememberPassword = () => {
    const formData = form.getFieldsValue()
    if (formData.rememberPassword) {
      AuthUtils.setRememberedAccount(JSON.stringify(formData))
    } else {
      AuthUtils.clearRememberedAccount()
    }
  }

  return {
    loginForm: form,
    clearPassword,
    handleAutoComplete,
    handleRememberPassword
  }
}
