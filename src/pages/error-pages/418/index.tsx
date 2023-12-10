export function Component() {
  const { t } = useTranslation()
  return (
    <DpErrorPage
      title={`418 ${t('418')}`}
      iconType="418"
    />
  )
}
