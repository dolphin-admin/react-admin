import DiscordIcon from '~icons/line-md/discord'

export default function DiscordButton() {
  const { DISCORD_URL } = AppMetadata
  return (
    <ATooltip
      title="Discord"
      placement="bottom"
    >
      <AIcon
        onClick={() => BrowserUtils.openNewWindow(DISCORD_URL)}
        className="cursor-pointer text-xl text-[#5865F2]"
        component={DiscordIcon}
      />
    </ATooltip>
  )
}
