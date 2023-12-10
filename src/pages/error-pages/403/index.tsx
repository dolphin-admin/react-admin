export function Component() {
  const { t } = useTranslation()
  return (
    <DpErrorPage
      title={`403 ${t('403')}`}
      iconType="403"
    />
  )
}
