import GoogleIcon from '~icons/logos/google-icon'
import GitHubIcon from '~icons/mdi/github'

export default function ThirdPartyLogin() {
  const { t } = useTranslation('AUTH')
  return (
    <>
      <ADivider className="!text-xs">{t('THIRD.PARTY.LOGIN')}</ADivider>
      <div className="flex flex-col space-y-2">
        <AButton
          className="!flex items-center justify-center !bg-[#595d5f] !text-white dark:bg-[#333333] dark:hover:!border-transparent"
          icon={<AIcon component={() => <GitHubIcon fontSize={18} />} />}
        >
          {t('LOGIN.WITH.GITHUB')}
        </AButton>
        <AButton
          className="!flex items-center justify-center"
          icon={<AIcon component={() => <GoogleIcon fontSize={14} />} />}
        >
          {t('LOGIN.WITH.GOOGLE')}
        </AButton>
      </div>
    </>
  )
}
