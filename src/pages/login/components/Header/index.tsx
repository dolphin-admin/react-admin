export default function Header() {
  const { t } = useTranslation('AUTH')
  return (
    <div className="flex flex-col items-center">
      <span className="flex items-center space-x-2">
        <span className="text-2xl font-medium">{AppMetadata.APP_NAME}</span>
        <DpIcon
          type="React"
          size={24}
        />
      </span>
      <span className="mb-4 mt-2">🎉 {t('WELCOME.BACK')}</span>
    </div>
  )
}
