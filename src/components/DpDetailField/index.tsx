import { isNil } from 'lodash-es'

function String({ value }: { value?: string }) {
  return (
    <ASkeleton
      loading={isNil(value)}
      paragraph={{ rows: 1 }}
    >
      <span>{value}</span>
    </ASkeleton>
  )
}

function I18nString({ value }: { value?: string }) {
  const { rt } = useRemoteTranslation()
  return (
    <ASkeleton
      loading={isNil(value)}
      paragraph={{ rows: 1 }}
    >
      <span>{rt(value)}</span>
    </ASkeleton>
  )
}

function DateString({ value }: { value?: string }) {
  let label
  let fullLabel
  if (!isNil(value)) {
    fullLabel = TimeUtils.formatTime(value)
    label = TimeUtils.isCurrentYear() ? TimeUtils.formatTime(value, 'MM-DD HH:mm:ss') : fullLabel
  }
  return (
    <ASkeleton
      loading={isNil(label)}
      paragraph={{ rows: 1 }}
    >
      <ATooltip
        className="cursor-pointer"
        title={fullLabel}
      >
        <span>{label}</span>
      </ATooltip>
    </ASkeleton>
  )
}

function Boolean({ value }: { value?: boolean }) {
  return (
    <ASkeleton
      loading={isNil(value)}
      paragraph={{ rows: 1 }}
    >
      <span>{value ? <DpIcon type="Check" /> : <DpIcon type="Close" />}</span>
    </ASkeleton>
  )
}

const DpDetailField = {
  String,
  I18nString,
  DateString,
  Boolean
}
export default DpDetailField
