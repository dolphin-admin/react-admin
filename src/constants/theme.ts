import type { AliasToken } from 'antd/es/theme/interface'

// 消息配置
export const messageConfig = {
  maxCount: 3,
  duration: 3
}

// 主题：基础配置
const themeBaseToken: Partial<AliasToken> = {
  fontFamily:
    'Nunito, Noto Sans SC, Noto Color Emoji, system-ui, -apple-system, Roboto, Helvetica Neue, Arial, sans-serif'
}

// 主题：亮色
export const themeLightToken: Partial<AliasToken> = {
  ...themeBaseToken,
  colorPrimary: '#1875ff',
  colorInfo: '#1875ff',
  colorBgBase: '#ffffff'
}

// 主题：暗色
export const themeDarkToken: Partial<AliasToken> = {
  ...themeBaseToken,
  colorPrimary: '#1875ff',
  colorPrimaryBg: '#333333',
  colorInfo: '#1875ff',
  colorBgBase: '#111111'
}
