export function Component() {
  const { t } = useTranslation()
  return (
    <DpErrorPage
      title={`404 ${t('404')}`}
      iconType="404"
    />
  )
}
