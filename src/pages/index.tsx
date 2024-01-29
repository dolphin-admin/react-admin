import { getImageFromAssets } from '@/features/assets'
import { commitMessage, committer, committerDate, github } from '~build/git'
import now from '~build/time'

export function Component() {
  const { APP_NAME, TEAM_NAME } = AppMetadata

  return (
    <main className="absolute inset-0 m-auto h-fit w-fit">
      <div className="flex w-full flex-col items-center justify-center space-y-4">
        <div className="whitespace-nowrap text-4xl text-blue-600">{APP_NAME}</div>
        <div className="flex items-center space-x-1.5">
          <AImage
            className="cursor-pointer transition-all active:scale-105 active:opacity-75"
            src={getImageFromAssets('bit_ocean.png')}
            alt=""
            loading="eager"
            width={20}
            preview={false}
            draggable={false}
          />
          <span className="text-sm text-gray-600">{TEAM_NAME}</span>
        </div>
        <div className="flex flex-col">
          <span>GitHub 地址：{github}</span>
          <span>上次部署时间：{TimeUtils.formatTime(now)}</span>
          <span>上次提交作者：{committer}</span>
          <span>上次提交信息：{commitMessage}</span>
          <span>上次提交日期：{TimeUtils.formatTime(committerDate)}</span>
        </div>
      </div>
    </main>
  )
}
