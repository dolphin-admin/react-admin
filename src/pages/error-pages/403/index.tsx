import UnAuthorizedIcon from '~icons/noto-v1/zipper-mouth-face'

export function Component() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleBack = () => navigate('/')
  return (
    <div className="flex h-full items-center justify-center">
      <AResult
        icon={<AIcon component={() => <UnAuthorizedIcon fontSize={80} />} />}
        title={`403 ${t('403')}`}
        extra={<AButton onClick={handleBack}>{t('BACK')}</AButton>}
      />
    </div>
  )
}
