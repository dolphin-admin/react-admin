import InternalServerErrorIcon from '~icons/noto-v1/face-with-head-bandage'

export function Component() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleBack = () => navigate('/')
  return (
    <div className="flex h-full items-center justify-center">
      <AResult
        icon={<AIcon component={() => <InternalServerErrorIcon fontSize={80} />} />}
        title={`500 ${t('500')}`}
        extra={<AButton onClick={handleBack}>{t('BACK')}</AButton>}
      />
    </div>
  )
}
