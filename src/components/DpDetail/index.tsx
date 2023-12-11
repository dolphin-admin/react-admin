import type { Multilingual } from '@dolphin-admin/utils'
import { isNil } from 'lodash-es'

function String({ value }: { value?: string }) {
  return (
    <ASkeleton loading={isNil(value)}>
      <span>{value}</span>
    </ASkeleton>
  )
}

function Boolean({ value }: { value?: boolean }) {
  return (
    <ASkeleton loading={isNil(value)}>
      <span>{value ? <DpIcon type="Check" /> : <DpIcon type="Close" />}</span>
    </ASkeleton>
  )
}

function I18n({ value }: { value?: Multilingual }) {
  return (
    <ASkeleton loading={isNil(value?.['en-US'])}>
      <div className="flex w-full flex-col space-y-1">
        {LangUtils.langMap((lang) => (
          <div
            key={lang}
            className="flex w-full justify-between"
          >
            <span>{value?.[lang]}</span>
            <span>{lang}</span>
          </div>
        ))}
      </div>
    </ASkeleton>
  )
}

const DpDetail = {
  String,
  Boolean,
  I18n
}
export default DpDetail
