import { BuiltInFont } from '@/constants'
import SettingsIcon from '~icons/line-md/cog'
import CloseIcon from '~icons/material-symbols/close-rounded'

export default function Settings() {
  const { t } = useTranslation(['COMMON', 'VALIDATION'])

  const { message: AMessage } = AApp.useApp()

  const themeStore = useThemeStore()
  const responsive = useResponsive()
  const [open, { toggle: toggleOpen, setLeft: setClose, setRight: setOpen }] = useToggle(false)
  
  const [fontConfig, setFontConfig] = useState(themeStore.fontFamily())

  const fontOptions = [
    { label: 'Nunito', value: BuiltInFont.NUNITO },
    { label: 'Jetbrains Mono', value: BuiltInFont.JET_BRAINS_MONO }
  ]

  const handleFontConfig = (value: string) => {
    setFontConfig(value)
  }

  const handleConfirm = () => {
    if (!fontConfig) {
      AMessage.success(t('VALIDATION:FONT'))
      return
    }
    themeStore.changeFontFamily(fontConfig)
    setClose()
  }

  return (
    <>
      <ATooltip
        title={t('SETTINGS')}
        placement="bottom"
      >
        <AIcon
          className="cursor-pointer text-xl"
          component={SettingsIcon}
          onClick={setOpen}
        />
      </ATooltip>
      <ADrawer
        title={t('PREFERENCE')}
        placement="right"
        onClose={setClose}
        open={open}
        closeIcon={false}
        extra={
          <AIcon
            className="hover:rounded hover:bg-gray-100 dark:hover:bg-black"
            style={{ fontSize: '24px' }}
            component={CloseIcon}
            onClick={toggleOpen}
          />
        }
        width={responsive.sm ? 400 : '100%'}
        footer={<AButton onClick={handleConfirm}>{t('CONFIRM')}</AButton>}
      >
        <AForm layout="vertical">
          <AForm.Item label={t('FONT')}>
            <ASelect
              onChange={handleFontConfig}
              placeholder={t('VALIDATION:FONT')}
              allowClear
              options={fontOptions}
            />
          </AForm.Item>
        </AForm>
      </ADrawer>
    </>
  )
}
