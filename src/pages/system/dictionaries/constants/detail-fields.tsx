const t = i18n.getFixedT(null, ['COMMON', 'DICTIONARY'])

export const detailFields = [
  { key: 'label', label: () => t('DICTIONARY:LABEL'), children: DpDetailField.I18nString },
  { key: 'code', label: () => t('DICTIONARY:CODE'), children: DpDetailField.String },
  { key: 'enabled', label: () => t('ENABLE.OR.NOT'), children: DpDetailField.Boolean },
  { key: 'remark', label: () => t('REMARK'), children: DpDetailField.I18nString },
  { key: 'createdAt', label: () => t('CREATED.AT'), children: DpDetailField.DateString }
]
