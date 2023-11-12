import nprogress from 'nprogress'
import { useNavigation } from 'react-router-dom'

nprogress.configure({ showSpinner: false })

export default function Root() {
  const navigation = useNavigation()

  useEffect(() => {
    if (navigation.state === 'loading') {
      nprogress.start()
    } else {
      nprogress.done()
    }
  }, [navigation.state])

  return <Outlet />
}
