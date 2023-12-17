export default function Settings() {
  const { t } = useTranslation()
  const responsive = useResponsive()
  const [showDrawer, { toggle: toggleShowDrawer }] = useToggle(false)

  return (
    <>
      <ATooltip
        title={t('SETTINGS')}
        placement="bottom"
      >
        <DpIcon
          type="Settings"
          className="cursor-pointer"
          size={20}
          depth={1}
          onClick={toggleShowDrawer}
        />
      </ATooltip>
      <ADrawer
        title={t('PREFERENCE')}
        placement="right"
        open={showDrawer}
        closeIcon={false}
        onClose={toggleShowDrawer}
        extra={
          <DpIcon
            type="Close"
            className="transition-all hover:rounded hover:bg-gray-100 dark:hover:bg-black"
            size={22}
            depth={1}
            onClick={toggleShowDrawer}
          />
        }
        width={responsive.sm ? 400 : '100%'}
        footer={
          <div className="flex items-center justify-end">
            <AButton onClick={toggleShowDrawer}>{t('CONFIRM')}</AButton>
          </div>
        }
      />
    </>
  )
}
