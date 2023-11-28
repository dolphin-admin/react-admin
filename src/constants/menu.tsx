import type { MenuItem } from '@/types'
// import UniversalComponentsIcon from '~icons/ic/baseline-auto-awesome-mosaic'
// import ChartsIcon from '~icons/ic/baseline-bar-chart'
// import UnauthorizedIcon from '~icons/ic/baseline-do-not-disturb'
// import ErrorPagesIcon from '~icons/ic/baseline-error-outline'
import ListTemplatesIcon from '~icons/ic/outline-list-alt'
// import NotFoundIcon from '~icons/tabler/error-404'
import CardTemplatesIcon from '~icons/ic/round-space-dashboard'
// import IAmATeapotIcon from '~icons/icon-park-outline/tea-drink'
// import InternalServerErrorIcon from '~icons/lucide/server-off'
// import UserManagementIcon from '~icons/mdi/account-cog-outline'
// import NavigationIcon from '~icons/mdi/compass-outline'
// import SystemFunctionsIcon from '~icons/mdi/function-variant'
// import DictionaryManagementIcon from '~icons/ri/booklet-line'
import CodeTemplatesIcon from '~icons/solar/code-bold'

// TODO: Fix i18n bug
const t = i18n.getFixedT(null, 'MENU')

export const menu: MenuItem[] = [
  // getItem(t('Menu.Navigation'), 'Navigation', <AIcon component={NavigationIcon} />),
  // getItem(t('Menu.SystemFunctions'), 'SystemFunctions', <AIcon component={SystemFunctionsIcon} />, [
  //   getItem(t('Menu.UserManagement'), 'UserManagement', <AIcon component={UserManagementIcon} />),
  //   getItem(
  //     t('Menu.DictionaryManagement'),
  //     'DictionaryManagement',
  //     <AIcon component={DictionaryManagementIcon} />
  //   )
  // ]),
  {
    label: t('CODE.TEMPLATES'),
    key: 'code-templates',
    icon: <AIcon component={CodeTemplatesIcon} />,
    children: [
      {
        label: t('CODE.TEMPLATES.TABLE'),
        key: 'code-templates/table',
        icon: <AIcon component={ListTemplatesIcon} />
      },
      {
        label: t('CODE.TEMPLATES.CARD'),
        key: 'code-templates/card',
        icon: <AIcon component={CardTemplatesIcon} />
      }
    ]
  }
  // getItem(
  //   t('Menu.UniversalComponents'),
  //   'UniversalComponents',
  //   <AIcon component={UniversalComponentsIcon} />,
  //   [getItem(t('Menu.Charts'), 'Charts', <AIcon component={ChartsIcon} />)]
  // ),
  // getItem(t('Menu.ErrorPages'), 'ErrorPages', <AIcon component={ErrorPagesIcon} />, [
  //   getItem(t('Menu.403'), 'Unauthorized', <AIcon component={UnauthorizedIcon} />),
  //   getItem(t('Menu.404'), 'NotFound', <AIcon component={NotFoundIcon} />),
  //   getItem(t('Menu.418'), 'IAmATeapot', <AIcon component={IAmATeapotIcon} />),
  //   getItem(t('Menu.500'), 'InternalServerError', <AIcon component={InternalServerErrorIcon} />)
  // ])
]
