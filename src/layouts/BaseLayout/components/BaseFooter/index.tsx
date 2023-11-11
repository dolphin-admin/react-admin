export default function Footer() {
  const { APP_NAME, VERSION, TEAM_NAME, TEAM_GITHUB_URL } = AppMetadata

  return (
    <ALayout.Footer style={{ textAlign: 'center', padding: 0 }}>
      <div className="flex h-10 w-full items-center justify-center space-x-2 text-xs">
        <span>
          {APP_NAME} - v{VERSION}
        </span>
        <span>©</span>
        <AImage
          className="-mb-2 cursor-pointer pb-2 transition-all hover:-translate-y-1 hover:scale-110 active:-translate-y-0 active:scale-105 active:opacity-75"
          src={AssetUtils.getImageFromAssets('bit_ocean.png')}
          alt=""
          loading="eager"
          width={18}
          onClick={() => BrowserUtils.openNewWindow(TEAM_GITHUB_URL)}
          preview={false}
          draggable={false}
        />
        <span>{TEAM_NAME}</span>
      </div>
    </ALayout.Footer>
  )
}
