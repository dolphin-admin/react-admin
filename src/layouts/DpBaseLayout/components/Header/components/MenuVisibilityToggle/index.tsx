import HideMenuIcon from '~icons/line-md/menu-fold-left'
import ShowMenuIcon from '~icons/line-md/menu-fold-right'

export default function MenuVisibilityToggle() {
  const { t } = useTranslation('LAYOUT')
  const sidebarStore = useSidebarStore()
  return (
    <ATooltip
      title={t('SIDEBAR.HIDE')}
      placement="bottom"
    >
      <AIcon
        className="cursor-pointer text-xl"
        component={sidebarStore.isDisplay ? HideMenuIcon : ShowMenuIcon}
        onClick={sidebarStore.toggleDisplay}
      />
    </ATooltip>
  )
}
