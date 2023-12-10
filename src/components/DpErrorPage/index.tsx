import type { IconType } from '@/types'

interface Props {
  title?: string
  iconType?: IconType
  iconSize?: number
}

const DpErrorPage = memo((props: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleBack = () => navigate('/')
  return (
    <div className="flex h-full items-center justify-center">
      <AResult
        icon={
          props.iconType && (
            <DpIcon
              type={props.iconType}
              size={props.iconSize ?? 100}
            />
          )
        }
        title={props.title}
        extra={<AButton onClick={handleBack}>{t('BACK')}</AButton>}
      />
    </div>
  )
})
export default DpErrorPage
