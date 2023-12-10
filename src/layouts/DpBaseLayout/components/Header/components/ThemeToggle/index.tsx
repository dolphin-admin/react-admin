import './index.module.scss'

import type { MouseEvent } from 'react'

export default function ThemeToggle() {
  const { t } = useTranslation('LAYOUT')
  const themeStore = useThemeStore()

  const isAppearanceTransition = () =>
    typeof document.startViewTransition !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleToggleTheme = async (event: MouseEvent) => {
    if (!isAppearanceTransition()) {
      themeStore.toggleTheme()
      return
    }
    const { clientX: x, clientY: y } = event
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )
    const transition = document.startViewTransition(() => themeStore.toggleTheme())
    await transition.ready
    const isDarkTheme = themeStore.isDarkTheme()
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    document.documentElement.animate(
      {
        clipPath: isDarkTheme ? clipPath : [...clipPath].reverse()
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: isDarkTheme ? '::view-transition-new(root)' : '::view-transition-old(root)'
      }
    )
  }

  return (
    <ATooltip
      title={t('HEADER.SWITCH.THEME')}
      placement="bottom"
    >
      <DpIcon
        type={themeStore.isLightTheme() ? 'Sun' : 'Moon'}
        className="cursor-pointer"
        size={20}
        color={themeStore.isLightTheme() ? '#FDC022' : '#FED736'}
        onClick={handleToggleTheme}
      />
    </ATooltip>
  )
}
