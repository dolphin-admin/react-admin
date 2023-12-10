import {
  Breadcrumb,
  DiscordButton,
  DocsButton,
  FullScreenButton,
  GitHubButton,
  LanguageButton,
  MenuVisibilityToggle,
  SettingsButton,
  ThemeToggle,
  UserAvatar
} from './components'

export default function Header() {
  return (
    <ALayout.Header
      className="z-50 flex items-center justify-between border-y border-gray-300 !p-2 dark:border-gray-950 sm:!p-4"
      style={{
        padding: '0 15px',
        height: '56px'
      }}
    >
      <div className="flex items-center justify-start !space-x-4">
        <MenuVisibilityToggle />
        <Breadcrumb />
      </div>

      <div className="flex items-center justify-start !space-x-4">
        <DiscordButton />
        <GitHubButton />
        <DocsButton />
        <FullScreenButton />
        <SettingsButton />
        <LanguageButton />
        <ThemeToggle />
        <UserAvatar />
      </div>
    </ALayout.Header>
  )
}
