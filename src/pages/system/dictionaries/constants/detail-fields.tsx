const t = i18n.getFixedT(null, ['DICTIONARY', 'COMMON'])

export const detailFields = [
  { key: 'label', label: () => t('LABEL'), children: DpDetail.I18n },
  { key: 'code', label: () => t('CODE'), children: DpDetail.String },
  { key: 'enabled', label: () => t('COMMON:ENABLE.OR.NOT'), children: DpDetail.Boolean },
  { key: 'builtIn', label: () => t('COMMON:IS.BUILTIN'), children: DpDetail.Boolean },
  { key: 'remark', label: () => t('COMMON:REMARK'), children: DpDetail.I18n }
]
