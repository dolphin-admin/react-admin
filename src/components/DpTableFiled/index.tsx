import { isNil } from 'lodash-es'

const { rt } = i18n
const t = i18n.getFixedT(null, 'COMMON')

const handleCopy = (str: string) => {
  BrowserUtils.setClipBoardText(str)
  AMessage.success(t('COPY.SUCCESS'))
}

const I18nString = (value: string) => rt(value)

function DateString(value: any) {
  let label
  let fullLabel
  if (!isNil(value)) {
    fullLabel = TimeUtils.formatTime(value)
    label = TimeUtils.isCurrentYear() ? TimeUtils.formatTime(value, 'MM-DD HH:mm:ss') : fullLabel
  }
  return (
    <ATooltip
      className="cursor-pointer"
      title={fullLabel}
    >
      <span>{label}</span>
    </ATooltip>
  )
}

function CopyableTagString(value: string) {
  return (
    <ATag
      className="cursor-pointer"
      style={{
        // NOTE: 消除默认内联边距
        marginInlineEnd: 0
      }}
      bordered
      onClick={() => handleCopy(value)}
    >
      {value}
    </ATag>
  )
}

function Boolean(value: any) {
  return value && <DpIcon type="Check" />
}

const DpTableField = {
  I18nString,
  DateString,
  CopyableTagString,
  Boolean
}
export default DpTableField
