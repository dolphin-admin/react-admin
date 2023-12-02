import { CollapseButton, Header, Mask, Menu } from './components'

export default function Sidebar() {
  const sidebarStore = useSidebarStore()
  return (
    <>
      <ALayout.Sider
        className={clsx(
          '!absolute inset-y-0 left-0 z-[100] h-screen overflow-auto border border-gray-300 shadow-sm dark:border-gray-950 sm:!static',
          !sidebarStore.isDisplay && 'border-r-0'
        )}
        collapsible
        collapsed={sidebarStore.isCollapse}
        onCollapse={(value) => sidebarStore.setIsCollapse(value)}
        width={sidebarStore.isDisplay ? 224 : 0}
        collapsedWidth={sidebarStore.isDisplay ? 64 : 0}
        trigger={null}
      >
        <Header />
        <Menu />
        <CollapseButton />
      </ALayout.Sider>
      <Mask />
    </>
  )
}
