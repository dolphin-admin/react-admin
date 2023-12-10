export function Component() {
  const { t } = useTranslation()
  return (
    <DpErrorPage
      title={`500 ${t('500')}`}
      iconType="500"
    />
  )
}
