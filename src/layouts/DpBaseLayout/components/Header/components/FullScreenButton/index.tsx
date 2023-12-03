import FullScreenIcon from '~icons/ic/round-fullscreen'
import ExitFullscreenIcon from '~icons/ic/round-fullscreen-exit'

export default function FullScreenButton() {
  const { t } = useTranslation('LAYOUT')
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body)

  return (
    <ATooltip
      title={t('HEADER.FULL.SCREEN')}
      placement="bottom"
    >
      <AIcon
        className="cursor-pointer text-2xl"
        component={isFullscreen ? ExitFullscreenIcon : FullScreenIcon}
        onClick={toggleFullscreen}
      />
    </ATooltip>
  )
}
