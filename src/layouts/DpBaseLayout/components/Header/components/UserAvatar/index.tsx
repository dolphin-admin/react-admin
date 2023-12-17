enum UserAction {
  'USER.INFO' = '1',
  'CHANGE.PASSWORD' = '2',
  'QUIT' = '3'
}

export default function UserAvatar() {
  const { t } = useTranslation(['LAYOUT', 'AUTH'])
  const { message } = AApp.useApp()
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
    message.success(t('AUTH:LOG.OUT.SUCCESS'))
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

  if (!userStore.hasData()) {
    return null
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
          size={22}
          className="cursor-pointer !bg-gray-300 hover:shadow"
        />
      ) : (
        <DpIcon
          className="cursor-pointer"
          type="Account"
          size={22}
          depth={1}
        />
      )}
    </ADropdown>
  )
}
