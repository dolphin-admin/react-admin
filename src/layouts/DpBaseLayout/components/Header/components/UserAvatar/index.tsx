import UserAvatarIcon from '~icons/carbon/user-avatar-filled-alt'

enum UserAction {
  'USER.INFO' = '0',
  'CHANGE.PASSWORD' = '1',
  'QUIT' = '2'
}
export default function UserAvatar() {
  const { t } = useTranslation(['LAYOUT', 'AUTH'])
  const { message: AMessage } = AApp.useApp()
  const userStore = useUserStore()
  const navigate = useNavigate()

  const menuItems = [
    {
      key: UserAction['USER.INFO'],
      label: t('HEADER.USER.INFO')
    },
    {
      key: UserAction['CHANGE.PASSWORD'],
      label: t('HEADER.CHANGE.PASSWORD')
    },
    {
      key: UserAction.QUIT,
      label: t('HEADER.LOG.OUT')
    }
  ]

  // 退出登录
  const logout = () => {
    userStore.clearUser()
    AuthUtils.clearAccessToken()
    AuthUtils.clearRefreshToken()
    navigate('/login', { replace: true })
    AMessage.success(t('AUTH:LOG.OUT.SUCCESS'))
  }

  if (!userStore.hasData()) {
    return null
  }

  // 点击菜单
  const handleClickMenu = ({ key }: { key: string }) => {
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

  return (
    <ADropdown
      menu={{
        items: menuItems,
        onClick: handleClickMenu
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
  )
}
