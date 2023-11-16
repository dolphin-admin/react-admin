import LanguageIcon from '~icons/ion/language-outline'
import ThemeSwitchIcon from '~icons/mdi/theme-light-dark'
import ToolIcon from '~icons/mdi/tools'

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
        style={{ right: 16, bottom: 72 }}
        icon={<AIcon component={ToolIcon} />}
        open={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <AFloatButton
          icon={<AIcon component={LanguageIcon} />}
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
