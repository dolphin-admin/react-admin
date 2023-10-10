import type { MenuProps } from 'antd'

import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'
// import NotificationIcon from '~icons/ic/baseline-notifications-none'
// import SettingIcon from '~icons/ic/outline-settings'
import FullScreenIcon from '~icons/ic/round-fullscreen'
// import ExitFullscreenIcon from '~icons/ic/round-fullscreen-exit'
import LanguageIcon from '~icons/ion/language-outline'
import DiscordIcon from '~icons/line-md/discord'
import DocsIcon from '~icons/line-md/document-list'
import GithubIcon from '~icons/line-md/github-loop'
import HideMenuIcon from '~icons/line-md/menu-fold-left'
// import ShowMenuIcon from '~icons/line-md/menu-fold-right'
import SunIcon from '~icons/line-md/moon-alt-to-sunny-outline-loop-transition'
import MoonIcon from '~icons/line-md/sunny-filled-loop-to-moon-alt-filled-loop-transition'

import BaseBreadcrumb from './BaseBreadcrumb'

export default function BaseHeader(): React.JSX.Element {
  const { t } = useTranslation(['Global', 'Auth', 'User', 'Layout'])

  const { message } = AntdApp.useApp()

  const userStore = useUserStore()
  const themeStore = useThemeStore()

  const { REPO_GITHUB_URL, DISCORD_URL, DOCS_URL } = AppConfig

  const navigate = useNavigate()

  /**
   * 退出登录
   */
  const logout = async () => {
    userStore.clearUser()
    AuthUtils.clearToken()
    navigate('/login', { replace: true })
    await message.success(t('Auth:Logout.Success'))
  }

  const items: MenuProps['items'] = [
    {
      key: 'UserInfo',
      label: t('Layout:Header.ChangePassword')
    },
    {
      key: 'ChangePassword',
      label: t('Layout:Header.ChangePassword')
    },
    {
      key: 'Quit',
      label: t('Layout:Header.Logout')
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'Lock':
        break
      case 'Quit':
        logout().catch(() => {})
        break
      case 'UserInfo':
        navigate('/user-info')
        break
      case 'ChangePassword':
        navigate('/change-password')
        break
      default:
        break
    }
  }

  return (
    <ALayout.Header
      className="flex items-center justify-between border-l"
      style={{
        padding: '0 15px',
        background: '#fff',
        height: '56px'
      }}
    >
      <div className="flex items-center justify-start !space-x-4">
        <APopover
          placement="bottom"
          content={t('Layout:Sidebar.Hide')}
          arrow
        >
          <AIcon
            className="cursor-pointer text-[20px]"
            component={HideMenuIcon as React.ForwardRefExoticComponent<any>}
          />
        </APopover>
        <BaseBreadcrumb />
      </div>
      <div className="flex items-center justify-start !space-x-4">
        <APopover
          placement="bottom"
          content="Discord"
          arrow
        >
          <AIcon
            onClick={() => BrowserUtils.openNewWindow(DISCORD_URL)}
            className="cursor-pointer text-[20px] text-[#5865F2]"
            component={DiscordIcon as React.ForwardRefExoticComponent<any>}
          />
        </APopover>
        <APopover
          placement="bottom"
          content="Github"
          arrow
        >
          <AIcon
            onClick={() => BrowserUtils.openNewWindow(REPO_GITHUB_URL)}
            className="cursor-pointer text-[20px]"
            component={GithubIcon as React.ForwardRefExoticComponent<any>}
          />
        </APopover>
        <APopover
          placement="bottom"
          content={t('Global:Docs')}
          arrow
        >
          <AIcon
            onClick={() => BrowserUtils.openNewWindow(DOCS_URL)}
            className="cursor-pointer text-[20px]"
            component={DocsIcon as React.ForwardRefExoticComponent<any>}
          />
        </APopover>
        <APopover
          placement="bottom"
          content={t('Layout:Header.FullScreen')}
          arrow
        >
          <AIcon
            className="cursor-pointer text-[20px]"
            component={FullScreenIcon as React.ForwardRefExoticComponent<any>}
          />
        </APopover>
        <APopover
          placement="bottom"
          content={t('Layout:Header.Language')}
          arrow
        >
          <AIcon
            className="cursor-pointer text-[20px]"
            component={LanguageIcon as React.ForwardRefExoticComponent<any>}
          />
        </APopover>
        <APopover
          placement="bottom"
          content={t('Layout:Header.SwitchTheme')}
          arrow
        >
          <AIcon
            className="cursor-pointer text-[20px]"
            onClick={() => themeStore.toggleTheme()}
            style={{
              color: themeStore.theme === 'light' ? '#FDC022' : '#FED736'
            }}
            component={
              themeStore.theme === 'light'
                ? (SunIcon as React.ForwardRefExoticComponent<any>)
                : (MoonIcon as React.ForwardRefExoticComponent<any>)
            }
          />
        </APopover>
        {userStore.hasData() && (
          <ADropdown menu={{ items, onClick }}>
            {userStore.user?.avatarUrl ? (
              <AAvatar
                src={userStore?.user.avatarUrl}
                size={28}
                className="cursor-pointer  !bg-gray-300 hover:shadow"
              />
            ) : (
              <AIcon
                className="cursor-pointer text-[28px]"
                component={
                  UserAvatarIcon as React.ForwardRefExoticComponent<any>
                }
              />
            )}
          </ADropdown>
        )}
      </div>
    </ALayout.Header>
  )
}
