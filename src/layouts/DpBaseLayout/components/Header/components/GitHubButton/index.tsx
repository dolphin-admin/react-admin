export default function GitHubButton() {
  const { REPO_GITHUB_URL } = AppMetadata
  return (
    <ATooltip
      title="Github"
      placement="bottom"
      arrow
    >
      <DpIcon
        type="GitHub:Dynamic"
        className="cursor-pointer"
        size={20}
        depth={2}
        onClick={() => BrowserUtils.openNewWindow(REPO_GITHUB_URL)}
      />
    </ATooltip>
  )
}
