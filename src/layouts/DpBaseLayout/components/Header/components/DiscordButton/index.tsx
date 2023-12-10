export default function DiscordButton() {
  const { DISCORD_URL } = AppMetadata
  return (
    <ATooltip
      title="Discord"
      placement="bottom"
    >
      <DpIcon
        type="Discord"
        className="cursor-pointer"
        size={20}
        color="#5865F2"
        onClick={() => BrowserUtils.openNewWindow(DISCORD_URL)}
      />
    </ATooltip>
  )
}
