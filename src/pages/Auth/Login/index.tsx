export function Component(): React.JSX.Element {
  const onFinish = () => {}

  return (
    <div className="absolute inset-0 m-auto flex h-fit w-[340px] max-w-[85%] flex-col space-y-4 rounded-lg bg-default-light px-4 py-8 shadow-md transition-colors dark:bg-default-dark sm:w-[260px] md:w-[340px]">
      <div className="select-none text-center text-lg font-semibold">登录</div>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            // prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            // prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            noStyle
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a href="">Forgot password</a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  )
}
