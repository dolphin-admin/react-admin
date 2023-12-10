export default function FullScreenButton() {
  const { t } = useTranslation('LAYOUT')
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body)

  return (
    <ATooltip
      title={t('HEADER.FULL.SCREEN')}
      placement="bottom"
    >
      <DpIcon
        type={isFullscreen ? 'Fullscreen:Exit' : 'Fullscreen'}
        className="cursor-pointer text-2xl"
        size={20}
        depth={1}
        onClick={toggleFullscreen}
      />
    </ATooltip>
  )
}
