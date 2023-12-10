export default function MenuVisibilityToggle() {
  const { t } = useTranslation('LAYOUT')
  const sidebarStore = useSidebarStore()
  return (
    <ATooltip
      title={t('SIDEBAR.HIDE')}
      placement="bottom"
    >
      <DpIcon
        type={sidebarStore.isDisplay ? 'Hide:Menu' : 'Show:Menu'}
        size={20}
        depth={1}
        onClick={sidebarStore.toggleDisplay}
      />
    </ATooltip>
  )
}
