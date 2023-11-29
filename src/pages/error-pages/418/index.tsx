import IAmATeapotIcon from '~icons/noto-v1/loudly-crying-face'

export function Component() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleBack = () => navigate('/')
  return (
    <div className="flex h-full items-center justify-center">
      <AResult
        icon={<AIcon component={() => <IAmATeapotIcon fontSize={80} />} />}
        title={`418 ${t('418')}`}
        extra={<AButton onClick={handleBack}>{t('BACK')}</AButton>}
      />
    </div>
  )
}
