import AIcon from '@ant-design/icons'
import { Lang } from '@dolphin-admin/utils'

import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'
// import NotificationIcon from '~icons/ic/baseline-notifications-none'
// import SettingIcon from '~icons/ic/outline-settings'
import FullScreenIcon from '~icons/ic/round-fullscreen'
import ExitFullscreenIcon from '~icons/ic/round-fullscreen-exit'
import LanguageIcon from '~icons/ion/language-outline'
import DiscordIcon from '~icons/line-md/discord'
import DocsIcon from '~icons/line-md/document-list'
import GithubIcon from '~icons/line-md/github-loop'
import HideMenuIcon from '~icons/line-md/menu-fold-left'
// import ShowMenuIcon from '~icons/line-md/menu-fold-right'
import SunIcon from '~icons/line-md/moon-alt-to-sunny-outline-loop-transition'
import MoonIcon from '~icons/line-md/sunny-filled-loop-to-moon-alt-filled-loop-transition'

enum UserAction {
  'USER.INFO' = '0',
  'CHANGE.PASSWORD' = '1',
  'QUIT' = '2'
}

export default function BaseHeader() {
  const { REPO_GITHUB_URL, DISCORD_URL, DOCS_URL } = AppMetadata

  const { t } = useTranslation(['GLOBAL', 'AUTH', 'USER', 'LAYOUT'])
  const { message } = AApp.useApp()
  const langStore = useLangStore()
  const userStore = useUserStore()
  const themeStore = useThemeStore()
  const navigate = useNavigate()
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body)

  const [langOptions, setLangOptions] = useImmer([
    {
      key: 'zh-CN',
      label: '简体中文',
      disabled: langStore.lang === Lang['zh-CN']
    },
    {
      key: 'en-US',
      label: 'English',
      disabled: langStore.lang === Lang['en-US']
    }
  ])

  // 退出登录
  const logout = () => {
    userStore.clearUser()
    AuthUtils.clearToken()
    navigate('/login', { replace: true })
    message.success(t('AUTH:LOG.OUT.SUCCESS'))
  }

  return (
    <ALayout.Header
      className="flex items-center justify-between"
      style={{
        padding: '0 15px',
        height: '56px'
      }}
    >
      <div className="flex items-center justify-start !space-x-4">
        <ATooltip
          title={t('LAYOUT:SIDEBAR.HIDE')}
          placement="bottom"
        >
          <AIcon
            className="cursor-pointer text-xl"
            component={HideMenuIcon}
          />
        </ATooltip>
        <BaseBreadcrumb />
      </div>

      <div className="flex items-center justify-start !space-x-4">
        <ATooltip
          title="Discord"
          placement="bottom"
        >
          <AIcon
            onClick={() => BrowserUtils.openNewWindow(DISCORD_URL)}
            className="cursor-pointer text-xl text-[#5865F2]"
            component={DiscordIcon}
          />
        </ATooltip>

        <ATooltip
          title="Github"
          placement="bottom"
          arrow
        >
          <AIcon
            onClick={() => BrowserUtils.openNewWindow(REPO_GITHUB_URL)}
            className="cursor-pointer text-xl"
            component={GithubIcon}
          />
        </ATooltip>

        <ATooltip
          title={t('GLOBAL:Docs')}
          placement="bottom"
        >
          <AIcon
            onClick={() => BrowserUtils.openNewWindow(DOCS_URL)}
            className="cursor-pointer text-xl"
            component={DocsIcon}
          />
        </ATooltip>

        <ATooltip
          title={t('LAYOUT:HEADER.FULL.SCREEN')}
          placement="bottom"
        >
          <AIcon
            className="cursor-pointer text-2xl"
            component={isFullscreen ? ExitFullscreenIcon : FullScreenIcon}
            onClick={() => toggleFullscreen()}
          />
        </ATooltip>

        <ADropdown
          menu={{
            items: langOptions,
            onClick: ({ key }) => {
              langStore.setLang(key)
              setLangOptions((state) => {
                state.forEach((item) => {
                  // eslint-disable-next-line no-param-reassign
                  item.disabled = item.key === key
                })
              })
            }
          }}
          placement="bottom"
        >
          <AIcon
            className="cursor-pointer text-xl"
            component={LanguageIcon}
          />
        </ADropdown>

        <ATooltip
          title={t('LAYOUT:HEADER.SWITCH.THEME')}
          placement="bottom"
        >
          <AIcon
            className="cursor-pointer text-xl"
            onClick={() => themeStore.toggleTheme()}
            style={{
              color: themeStore.isLightTheme() ? '#FDC022' : '#FED736'
            }}
            component={themeStore.isLightTheme() ? SunIcon : MoonIcon}
          />
        </ATooltip>

        {userStore.hasData() && (
          <ADropdown
            menu={{
              items: [
                {
                  key: UserAction['USER.INFO'],
                  label: t('LAYOUT:HEADER.USER.INFO')
                },
                {
                  key: UserAction['CHANGE.PASSWORD'],
                  label: t('LAYOUT:HEADER.CHANGE.PASSWORD')
                },
                {
                  key: UserAction.QUIT,
                  label: t('LAYOUT:HEADER.LOG.OUT')
                }
              ],
              onClick: ({ key }) => {
                switch (key) {
                  case UserAction['USER.INFO']:
                    navigate('/user-info')
                    break
                  case UserAction['CHANGE.PASSWORD']:
                    navigate('/change-password')
                    break
                  case UserAction.QUIT:
                    logout()
                    break
                  default:
                    break
                }
              }
            }}
          >
            {userStore.user.avatarUrl ? (
              <AAvatar
                src={userStore.user.avatarUrl}
                size={28}
                className="cursor-pointer  !bg-gray-300 hover:shadow"
              />
            ) : (
              <AIcon
                className="cursor-pointer text-xl"
                component={UserAvatarIcon}
              />
            )}
          </ADropdown>
        )}
      </div>
    </ALayout.Header>
  )
}
