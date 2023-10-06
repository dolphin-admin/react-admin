export default function BaseBreadcrumb(): React.JSX.Element {
  const location = useLocation()
  const pathSnippets = location.pathname.split('/').filter((i) => i)

  const breadcrumbNameMap: Record<string, string> = {
    '/apps': 'Application List',
    '/apps/1': 'Application1',
    '/apps/2': 'Application2',
    '/apps/1/detail': 'Detail',
    '/apps/2/detail': 'Detail'
  }
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    return {
      key: url,
      title: <Link to={url}>{breadcrumbNameMap[url]}</Link>
    }
  })

  const breadcrumbItems = [
    {
      title: <Link to="/">Home</Link>,
      key: 'home'
    }
  ].concat(extraBreadcrumbItems)

  return (
    <ABreadcrumb
      style={{ margin: '16px 0' }}
      items={breadcrumbItems}
    />
  )
}
