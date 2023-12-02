import { Lang } from '@dolphin-admin/utils'

import LanguageIcon from '~icons/ion/language-outline'

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
      <AIcon
        className="cursor-pointer text-xl"
        component={LanguageIcon}
      />
    </ADropdown>
  )
}
