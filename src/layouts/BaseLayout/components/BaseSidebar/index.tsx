import { menu } from '@/constants'

export default function BaseSidebar() {
  const { APP_NAME } = AppMetadata

  const sidebarStore = useSidebarStore()

  const navigate = useNavigate()

  return (
    <ALayout.Sider
      className="fixed inset-y-0 left-0 h-full overflow-auto"
      collapsible
      collapsed={sidebarStore.isCollapse}
      onCollapse={(value) => sidebarStore.setIsCollapse(value)}
      width="230"
      collapsedWidth="64"
    >
      <div
        className="flex h-14 w-full items-center justify-center"
        onClick={() => navigate('/')}
      >
        <AImage
          className="cursor-pointer"
          src={AssetUtils.getImageFromAssets('favicon.png')}
          alt=""
          width={36}
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
