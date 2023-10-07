import i18n, { changeLanguage } from '@/i18n'
import type { Lang } from '@/types'

import BaseBreadcrumb from './BaseBreadcrumb'

export default function BaseHeader(): React.JSX.Element {
  const { language } = i18n

  const { t } = useTranslation('Layout')

  const navigate = useNavigate()

  const languageOptions = [
    { label: 'English', value: 'en_US' },
    { label: '简体中文', value: 'zh_CN' }
  ]

  const handleChangeLanguage = (value: string) => {
    changeLanguage(value as Lang).catch(() => {})
  }

  const handleLogout = () => {
    AuthUtils.clearToken()
    navigate('/login', { replace: true })
  }

  return (
    <ALayout.Header
      style={{
        padding: 16,
        background: '#ffffff',
        height: '56px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <BaseBreadcrumb />
      <ASpace>
        <ASelect
          value={language}
          style={{ width: 120 }}
          options={languageOptions}
          onChange={handleChangeLanguage}
        />
        <AButton
          type="primary"
          onClick={handleLogout}
        >
          {t('Header.Logout')}
        </AButton>
      </ASpace>
    </ALayout.Header>
  )
}
