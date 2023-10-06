import type { MenuProps } from 'antd'

import i18n from '@/i18n'
import UniversalComponentsIcon from '~icons/ic/baseline-auto-awesome-mosaic'
import ChartsIcon from '~icons/ic/baseline-bar-chart'
import UnauthorizedIcon from '~icons/ic/baseline-do-not-disturb'
import ErrorPagesIcon from '~icons/ic/baseline-error-outline'
import ListTemplatesIcon from '~icons/ic/outline-list-alt'
import IAmATeapotIcon from '~icons/icon-park-outline/tea-drink'
import InternalServerErrorIcon from '~icons/lucide/server-off'
import UserManagementIcon from '~icons/mdi/account-cog-outline'
import NavigationIcon from '~icons/mdi/compass-outline'
import SystemFunctionsIcon from '~icons/mdi/function-variant'
import DictionaryManagementIcon from '~icons/ri/booklet-line'
import CodeTemplatesIcon from '~icons/solar/code-bold'
import NotFoundIcon from '~icons/tabler/error-404'

type MenuItem = Required<MenuProps>['items'][number]

const { t } = i18n

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem => ({
  key,
  icon,
  children,
  label
})

export const menu: MenuItem[] = [
  getItem(
    t('Global:Menu.Navigation'),
    'Navigation',
    <Icon component={NavigationIcon as React.ForwardRefExoticComponent<any>} />
  ),
  getItem(
    t('Global:Menu.SystemFunctions'),
    'SystemFunctions',
    <Icon
      component={SystemFunctionsIcon as React.ForwardRefExoticComponent<any>}
    />,
    [
      getItem(
        t('Global:Menu.UserManagement'),
        'UserManagement',
        <Icon
          component={UserManagementIcon as React.ForwardRefExoticComponent<any>}
        />
      ),
      getItem(
        t('Global:Menu.DictionaryManagement'),
        'DictionaryManagement',
        <Icon
          component={
            DictionaryManagementIcon as React.ForwardRefExoticComponent<any>
          }
        />
      )
    ]
  ),
  getItem(
    t('Global:Menu.CodeTemplates'),
    'CodeTemplates',
    <Icon
      component={CodeTemplatesIcon as React.ForwardRefExoticComponent<any>}
    />,
    [
      getItem(
        t('Global:Menu.ListTemplates'),
        'ListTemplates',
        <Icon
          component={ListTemplatesIcon as React.ForwardRefExoticComponent<any>}
        />
      )
    ]
  ),
  getItem(
    t('Global:Menu.UniversalComponents'),
    'UniversalComponents',
    <Icon
      component={
        UniversalComponentsIcon as React.ForwardRefExoticComponent<any>
      }
    />,
    [
      getItem(
        t('Global:Menu.Charts'),
        'Charts',
        <Icon component={ChartsIcon as React.ForwardRefExoticComponent<any>} />
      )
    ]
  ),
  getItem(
    t('Global:Menu.ErrorPages'),
    'ErrorPages',
    <Icon component={ErrorPagesIcon as React.ForwardRefExoticComponent<any>} />,
    [
      getItem(
        t('Global:Menu.403'),
        'Unauthorized',
        <Icon
          component={UnauthorizedIcon as React.ForwardRefExoticComponent<any>}
        />
      ),
      getItem(
        t('Global:Menu.404'),
        'NotFound',
        <Icon
          component={NotFoundIcon as React.ForwardRefExoticComponent<any>}
        />
      ),
      getItem(
        t('Global:Menu.418'),
        'IAmATeapot',
        <Icon
          component={IAmATeapotIcon as React.ForwardRefExoticComponent<any>}
        />
      ),
      getItem(
        t('Global:Menu.500'),
        'InternalServerError',
        <Icon
          component={
            InternalServerErrorIcon as React.ForwardRefExoticComponent<any>
          }
        />
      )
    ]
  )
]
