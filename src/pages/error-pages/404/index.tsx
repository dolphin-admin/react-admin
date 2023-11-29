import NotFoundIcon from '~icons/noto-v1/crying-face'

export function Component() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleBack = () => navigate('/')
  return (
    <div className="flex h-full items-center justify-center">
      <AResult
        icon={<AIcon component={() => <NotFoundIcon fontSize={80} />} />}
        title={`404 ${t('404')}`}
        extra={<AButton onClick={handleBack}>{t('BACK')}</AButton>}
      />
    </div>
  )
}
