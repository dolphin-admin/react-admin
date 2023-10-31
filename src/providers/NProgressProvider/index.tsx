import 'nprogress/nprogress.css'

import nprogress from 'nprogress'

nprogress.configure({ showSpinner: false })

export default function NProgressProvider({
  children
}: {
  children?: React.ReactNode
}) {
  const location = useLocation()
  useEffect(() => {
    nprogress.start()
    nprogress.done()
    return () => {
      nprogress.done()
    }
  }, [location.pathname])
  return <>{children}</>
}
