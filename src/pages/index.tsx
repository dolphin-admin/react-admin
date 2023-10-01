import reactLogo from '@/assets/svg/react.svg'
import viteLogo from '@/assets/svg/vite.svg'
import { Button, Switch } from 'antd'
import SunIcon from '~icons/line-md/sun-rising-loop'
import MoonIcon from '~icons/line-md/moon-filled-alt-loop'

export function Component(): React.JSX.Element {
  const { theme, toggleTheme } = useThemeStore()
  return (
    <div className="absolute inset-0 m-auto flex h-fit w-fit flex-col space-y-4">
      <div className="flex items-center justify-center space-x-4">
        <a
          href="https://vitejs.dev"
          target="_blank"
          rel="noreferrer"
          className="hover:animate-bounce"
        >
          <img
            src={viteLogo}
            width="64"
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer"
          className="hover:animate-spin"
        >
          <img
            src={reactLogo}
            width="64"
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <span className="text-2xl">React TypeScript Starter Template</span>
      <Button className="self-center">Get Started</Button>

      <Switch
        className="self-center"
        checkedChildren={<SunIcon className="mt-1 w-[18px] text-yellow-400" />}
        unCheckedChildren={
          <MoonIcon className="mt-2 w-[18px] text-yellow-400" />
        }
        checked={theme === 'light'}
        onChange={toggleTheme}
      />
    </div>
  )
}
