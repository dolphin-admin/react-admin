import { menu } from '@/constants'
import CollapseIcon from '~icons/line-md/chevron-small-double-left'

export default function BaseSidebar() {
  const { APP_NAME } = AppMetadata

  const sidebarStore = useSidebarStore()
  const navigate = useNavigate()
  const siderBg = ATheme.useToken().token.Layout?.siderBg

  return (
    <>
      <ALayout.Sider
        className="!absolute inset-y-0 left-0 z-[100] h-screen overflow-auto border border-gray-300 shadow-sm transition-[width] dark:border-gray-950 sm:!static"
        collapsible
        collapsed={sidebarStore.isCollapse}
        onCollapse={(value) => sidebarStore.setIsCollapse(value)}
        width={sidebarStore.isDisplay ? 230 : 0}
        collapsedWidth={sidebarStore.isDisplay ? 64 : 0}
        trigger={null}
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

        {/* 菜单 */}
        <AMenu
          className="h-[calc(100%-96px)] !border-0"
          style={{ backgroundColor: siderBg }}
          defaultSelectedKeys={['1']}
          mode="inline"
          items={menu}
        />

        {/* 底部折叠按钮 */}
        <div className="h-10 p-1">
          <div
            className="group flex h-full w-full cursor-pointer items-center justify-center rounded-sm transition-all hover:bg-gray-200 active:opacity-75 dark:hover:bg-gray-600"
            onClick={sidebarStore.toggleCollapse}
          >
            <AIcon
              className={clsx(
                'text-2xl transition-transform duration-300 group-hover:scale-110 group-active:scale-100',
                sidebarStore.isCollapse ? 'rotate-180' : 'rotate-0'
              )}
              component={CollapseIcon}
            />
          </div>
        </div>
      </ALayout.Sider>

      {/* 遮罩 */}
      <div
        className={clsx(
          'absolute inset-0 z-[75] bg-black opacity-40 sm:hidden',
          sidebarStore.isDisplay ? 'block' : 'hidden'
        )}
        onClick={sidebarStore.toggleDisplay}
      />
    </>
  )
}
