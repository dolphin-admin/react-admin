export function Component(): React.JSX.Element {
  const { APP_NAME, TEAM_NAME } = AppConfig

  return (
    <main className="flex items-center justify-center">
      <div className="flex w-[80%] flex-col items-center space-y-4 sm:w-[500px]">
        <div className="flex w-full flex-col items-center justify-center space-y-4 text-blue-600">
          <div className="whitespace-nowrap text-4xl">{APP_NAME}</div>
          <div className="flex items-center space-x-1.5">
            <img
              className="cursor-pointer transition-all active:scale-105 active:opacity-75"
              src={AssetUtils.getImageFromAssets('bit_ocean.png')}
              alt=""
              loading="eager"
              width="14"
              height="14"
            />
            <span className="text-sm text-gray-600">{TEAM_NAME}</span>
          </div>
        </div>
      </div>
    </main>
  )
}
