import ThemeSwitchIcon from '~icons/mdi/theme-light-dark'

/**
 * 悬浮按钮形式的开发菜单
 * @description
 * - 仅在开发环境下显示
 * - 用于页面切换主题、语言，方便调试
 */
export default function DpDevMenuFab() {
  const { IS_DEV } = GlobalEnvConfig

  const themeStore = useThemeStore()
  const langStore = useLangStore()

  const [isOpen, setIsOpen] = useState(false)

  // 切换语言
  const handleChangeLanguage = () => {
    langStore.setLang(langStore.lang === 'zh-CN' ? 'en-US' : 'zh-CN')
    setIsOpen(false)
  }

  // 切换主题
  const handleToggleTheme = () => {
    themeStore.toggleTheme()
    setIsOpen(false)
  }

  // 仅在开发环境下显示
  if (IS_DEV) {
    return (
      <AFloatButton.Group
        trigger="click"
        type="primary"
        style={{ left: 16, bottom: 72, zIndex: 1000_000_000 }}
        icon={<DpIcon type="Tools" />}
        open={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <AFloatButton
          icon={<DpIcon type="Lang" />}
          onClick={handleChangeLanguage}
        />
        <AFloatButton
          icon={<AIcon component={ThemeSwitchIcon} />}
          onClick={handleToggleTheme}
        />
      </AFloatButton.Group>
    )
  }
}
