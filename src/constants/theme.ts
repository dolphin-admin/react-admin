import type { ThemeConfig } from 'antd'
import type { AliasToken } from 'antd/es/theme/interface'

// 消息配置
export const messageConfig = {
  maxCount: 3,
  duration: 1.5
}

// 主题：基础配置
const themeBaseToken: Partial<AliasToken> = {
  fontFamily:
    'Nunito, Noto Sans SC, Noto Color Emoji, system-ui, -apple-system, Roboto, Helvetica Neue, Arial, sans-serif'
}

// 主题：全局
export const themeLightConfig: ThemeConfig = {
  algorithm: ATheme.defaultAlgorithm,
  token: {
    ...themeBaseToken,
    colorPrimary: '#1875ff',
    colorInfo: '#1875ff',
    colorBgBase: '#ffffff',
    colorTextBase: '#000000'
  },
  components: {
    Layout: {
      bodyBg: '#ffffff',
      footerBg: '#ffffff',
      headerBg: '#ffffff',
      siderBg: '#ffffff'
    },
    Card: {
      paddingLG: 16
    }
  }
}

export const themeDarkConfig: ThemeConfig = {
  algorithm: ATheme.darkAlgorithm,
  token: {
    ...themeBaseToken,
    colorPrimary: '#1875ff',
    colorPrimaryBg: '#333333',
    colorInfo: '#1875ff',
    colorBgBase: '#111111',
    colorTextBase: '#ffffff'
  },
  components: {
    Layout: {
      bodyBg: '36393f',
      footerBg: '#36393f',
      headerBg: '#36393f',
      siderBg: '#36393f'
    },
    Card: {
      paddingLG: 16
    }
  }
}
