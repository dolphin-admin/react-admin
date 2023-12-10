import { Lang } from '@dolphin-admin/utils'

export default function LanguageButton() {
  const langStore = useLangStore()

  const [langOptions, setLangOptions] = useImmer([
    {
      key: 'zh-CN',
      label: '简体中文',
      disabled: langStore.lang === Lang['zh-CN']
    },
    {
      key: 'en-US',
      label: 'English',
      disabled: langStore.lang === Lang['en-US']
    }
  ])

  return (
    <ADropdown
      menu={{
        items: langOptions,
        onClick: ({ key }) => {
          langStore.setLang(key)
          setLangOptions((draft) => {
            draft.forEach((item) => {
              item.disabled = item.key === key
            })
          })
        }
      }}
      placement="bottom"
    >
      <DpIcon
        type="Lang"
        className="cursor-pointer"
        size={20}
        depth={1}
      />
    </ADropdown>
  )
}
