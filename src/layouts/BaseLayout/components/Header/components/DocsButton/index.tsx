import DocsIcon from '~icons/line-md/document-list'

export default function DocsButton() {
  const { DOCS_URL } = AppMetadata
  const { t } = useTranslation()
  return (
    <ATooltip
      title={t('DOCS')}
      placement="bottom"
    >
      <AIcon
        onClick={() => BrowserUtils.openNewWindow(DOCS_URL)}
        className="cursor-pointer text-xl"
        component={DocsIcon}
      />
    </ATooltip>
  )
}
