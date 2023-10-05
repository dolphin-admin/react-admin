export default function BaseFooter(): React.JSX.Element {
  const { APP_NAME, VERSION, TEAM_NAME, TEAM_GITHUB_URL } = AppConfig

  return (
    <Layout.Footer style={{ textAlign: 'center', padding: 0 }}>
      <div className="flex h-10 w-full items-center justify-center space-x-2 text-xs">
        <span>
          {APP_NAME} - v{VERSION}
        </span>
        <span>©</span>
        <img
          className="-mb-2 cursor-pointer pb-2 transition-all hover:-translate-y-1 hover:scale-110 active:-translate-y-0 active:scale-105 active:opacity-75"
          src={AssetUtils.getImageFromAssets('bit_ocean.png')}
          alt=""
          loading="eager"
          width="18"
          onClick={() => BrowserUtils.openNewWindow(TEAM_GITHUB_URL)}
        />
        <span>{TEAM_NAME}</span>
      </div>
    </Layout.Footer>
  )
}
