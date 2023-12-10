import { Lang } from '@dolphin-admin/utils'

interface Props {
  lang?: string
  setLang?: (lang: string) => void
}
const DpLangSelector = memo((props: Props) => {
  const { i18n } = useTranslation()

  const langOptions = [
    {
      value: 'zh-CN',
      label: '简体中文',
      disabled: props.lang === Lang['zh-CN']
    },
    {
      value: 'en-US',
      label: 'English',
      disabled: props.lang === Lang['en-US']
    }
  ]

  useEffect(() => {
    if (typeof props.setLang === 'function') {
      props.setLang(i18n.language)
    }
  }, [])

  return (
    <ASelect
      value={props.lang}
      options={langOptions}
      onChange={(value) => {
        if (typeof props.setLang === 'function') {
          props.setLang(value)
        }
      }}
    />
  )
})
export default DpLangSelector
