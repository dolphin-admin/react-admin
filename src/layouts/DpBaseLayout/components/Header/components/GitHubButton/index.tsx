import GithubIcon from '~icons/line-md/github-loop'

export default function GitHubButton() {
  const { REPO_GITHUB_URL } = AppMetadata
  return (
    <ATooltip
      title="Github"
      placement="bottom"
      arrow
    >
      <AIcon
        onClick={() => BrowserUtils.openNewWindow(REPO_GITHUB_URL)}
        className="cursor-pointer text-xl"
        component={GithubIcon}
      />
    </ATooltip>
  )
}
