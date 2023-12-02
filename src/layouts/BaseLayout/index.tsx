import { Content, Footer, Header, Sidebar } from './components'

export default function Layout() {
  const { isLoading } = useAuthGuard()

  if (isLoading) {
    return <DpGlobalLoading />
  }

  return (
    // 此处 rootClassName 不加 !flex-row 会导致加载布局闪屏
    <ALayout rootClassName="!flex !flex-row">
      <Sidebar />
      <ALayout className="border-r border-gray-300 dark:border-gray-950">
        <Header />
        <Content />
        <Footer />
      </ALayout>
    </ALayout>
  )
}
