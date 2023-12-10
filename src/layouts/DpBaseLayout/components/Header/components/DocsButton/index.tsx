export default function DocsButton() {
  const { DOCS_URL } = AppMetadata
  const { t } = useTranslation()
  return (
    <ATooltip
      title={t('DOCS')}
      placement="bottom"
    >
      <DpIcon
        type="Docs"
        className="cursor-pointer"
        size={20}
        depth={2}
        onClick={() => BrowserUtils.openNewWindow(DOCS_URL)}
      />
    </ATooltip>
  )
}
