import { BuiltInFont } from '@/enums'

export default function Settings() {
  const { t } = useTranslation(['COMMON', 'VALIDATION'])
  const { message } = AApp.useApp()
  const themeStore = useThemeStore()
  const responsive = useResponsive()

  const [showDrawer, { toggle: toggleShowDrawer }] = useToggle(false)

  const [themeConfig, setThemeConfig] = useImmer({
    fontFamily: themeStore.getFontFamily()
  })

  const fontOptions = [
    { label: 'Nunito', value: BuiltInFont.NUNITO },
    { label: 'Jetbrains Mono', value: BuiltInFont.JET_BRAINS_MONO }
  ]

  const handleChangeFont = (value: string) =>
    setThemeConfig((draft) => {
      draft.fontFamily = value
    })

  const handleConfirm = () => {
    if (!themeConfig.fontFamily) {
      message.error(t('VALIDATION:FONT'))
      return
    }
    themeStore.changeFontFamily(themeConfig.fontFamily)
    toggleShowDrawer()
  }

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
            <AButton onClick={handleConfirm}>{t('CONFIRM')}</AButton>
          </div>
        }
      >
        <AForm layout="vertical">
          <AForm.Item label={t('FONT')}>
            <ASelect
              options={fontOptions}
              value={themeConfig.fontFamily}
              onChange={handleChangeFont}
              placeholder={t('VALIDATION:FONT')}
              allowClear
            />
          </AForm.Item>
        </AForm>
      </ADrawer>
    </>
  )
}
