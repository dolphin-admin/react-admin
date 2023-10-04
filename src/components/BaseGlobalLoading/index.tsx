export default function BaseGlobalLoading(): React.JSX.Element {
  const { APP_NAME } = AppConfig

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Spin size="large" />
      <span className="mb-1 mt-4 text-xl">{APP_NAME}</span>
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
        Powered by Bit Ocean
      </div>
    </main>
  )
}
