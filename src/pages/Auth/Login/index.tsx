import GitHubIcon from '~icons/ant-design/github-outlined'
import GoogleIcon from '~icons/logos/google-icon'

interface FormValues {
  username: string
  password: string
  rememberPassword: boolean
}

export function Component(): React.JSX.Element {
  const navigate = useNavigate()

  const [form] = Form.useForm<FormValues>()

  const [submitType, setSubmitType] = useState<'BASIC' | 'ADMIN'>('BASIC')
  const [submitLoading, setSubmitLoading] = useState(false)

  useEffect(() => {
    // 从 localStorage 中获取记住的账号密码
    const localStorageData = AuthUtils.getRememberedAccount()
    if (localStorageData) {
      try {
        const { username, password, rememberPassword } = JSON.parse(
          localStorageData
        ) as FormValues
        form.setFieldsValue({ username, password, rememberPassword })
      } catch {
        //
      }
    }
  }, [form])

  /**
   * 登录
   */
  const handleLogin = (values: FormValues) => {
    setSubmitLoading(true)
    const { rememberPassword } = values
    if (rememberPassword) {
      AuthUtils.setRememberedAccount(JSON.stringify(values))
    } else {
      AuthUtils.clearRememberedAccount()
    }
  }

  /**
   * 基础登录
   */
  const loginAsBasic = () => {
    setSubmitType('BASIC')
  }

  /**
   * 以管理员身份登录
   */
  const loginAsAdmin = () => {
    setSubmitType('ADMIN')
    form.setFieldValue('username', AuthUtils.DEFAULT_ADMIN_USERNAME)
    form.setFieldValue('password', AuthUtils.DEFAULT_PASSWORD)
  }

  /**
   * 忘记密码
   */
  // const handleForgetPassword = () => navigate('/forget-password')

  const handleSignup = () => navigate('/signup')

  return (
    <div className="absolute inset-0 m-auto flex h-fit w-[340px] max-w-[85%] flex-col space-y-4 rounded-lg bg-default-light px-4 py-8 shadow-md transition-colors dark:bg-default-dark sm:w-[260px] md:w-[340px]">
      <div className="select-none text-center text-lg font-semibold">登录</div>
      <Form
        form={form}
        name="login"
        initialValues={{
          username: '',
          password: '',
          rememberPassword: false
        }}
        onFinish={handleLogin}
        autoComplete="off"
        disabled={submitLoading}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            placeholder="用户名"
            autoComplete="username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            placeholder="密码"
            autoComplete="current-password"
          />
        </Form.Item>

        <div className="text-grey-300 flex items-center justify-between text-xs font-light">
          <Form.Item
            name="rememberPassword"
            valuePropName="checked"
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          {/* <Form.Item>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    paddingInlineSM: 0
                  }
                }
              }}
            >
              <Button
                size="small"
                type="link"
                htmlType="button"
                onClick={handleForgetPassword}
              >
                忘记密码
              </Button>
            </ConfigProvider>
          </Form.Item> */}
        </div>

        <Form.Item>
          <div className="flex w-full flex-1 items-center space-x-2">
            <Button
              rootClassName="!w-[calc(50%-4px)]"
              type="primary"
              htmlType="submit"
              disabled={submitLoading}
              loading={submitType === 'BASIC' && submitLoading}
              onClick={loginAsBasic}
            >
              登录
            </Button>
            <Button
              rootClassName="!w-[calc(50%-4px)]"
              htmlType="submit"
              disabled={submitLoading}
              loading={submitType === 'ADMIN' && submitLoading}
              onClick={loginAsAdmin}
            >
              以管理员登录
            </Button>
          </div>
        </Form.Item>

        <div className="flex items-center space-x-1 text-xs">
          <span>需要账号？</span>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  paddingInlineSM: 0
                }
              }
            }}
          >
            <Button
              size="small"
              type="link"
              htmlType="button"
              onClick={handleSignup}
            >
              <span className="text-xs font-semibold underline-offset-4 hover:underline">
                注册
              </span>
            </Button>
          </ConfigProvider>
        </div>

        <Divider>
          <span className="text-xs">第三方登录</span>
        </Divider>

        <div className="flex flex-col space-y-2">
          <Button
            className="!bg-[#595D5F]"
            type="primary"
            htmlType="button"
            icon={
              <Icon
                component={GitHubIcon as React.ForwardRefExoticComponent<any>}
              />
            }
          >
            GitHub 登录
          </Button>
          <Button
            htmlType="button"
            icon={
              <Icon
                component={GoogleIcon as React.ForwardRefExoticComponent<any>}
              />
            }
          >
            Google 登录
          </Button>
        </div>
      </Form>
    </div>
  )
}
