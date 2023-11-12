import { menu } from '@/constants'

export default function Sidebar() {
  const { APP_NAME } = AppMetadata

  const sidebarStore = useSidebarStore()

  const navigate = useNavigate()

  return (
    <ALayout.Sider
      collapsible
      collapsed={sidebarStore.isCollapse}
      onCollapse={(value) => sidebarStore.setIsCollapse(value)}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0
      }}
      width="220"
      collapsedWidth="64"
      theme="light"
    >
      <div
        className="flex h-14 w-full items-center justify-center"
        onClick={() => navigate('/')}
      >
        <AImage
          className="cursor-pointer"
          width={36}
          src={AssetUtils.getImageFromAssets('favicon.png')}
          alt=""
          loading="eager"
          preview={false}
          draggable={false}
        />
        <span
          className={clsx([
            'cursor-pointer whitespace-nowrap text-sm tracking-wide transition-all',
            // eslint-disable-next-line no-nested-ternary
            sidebarStore.isDisplay
              ? sidebarStore.isCollapse
                ? 'ml-0 hidden'
                : 'ml-1 w-auto'
              : 'hidden'
          ])}
        >
          {APP_NAME}
        </span>
      </div>
      <AMenu
        defaultSelectedKeys={['1']}
        mode="inline"
        items={menu}
      />
    </ALayout.Sider>
  )
}
