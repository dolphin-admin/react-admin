import { STALE } from '@/constants'

interface Options {
  enabled?: boolean
}

export const PROFILE_QUERY_KEY = 'profile'

export const profileQK = () => [PROFILE_QUERY_KEY]

export const useProfileQuery = (options?: Options) => {
  const userStore = useUserStore()

  const query = useQuery({
    queryKey: profileQK(),
    queryFn: () => UserAPI.profile(),
    enabled: options?.enabled,
    staleTime: STALE.HOURS.ONE
  })

  useEffect(() => {
    if (query.data) {
      const { data: user } = query
      userStore.setUser(user ?? {})
    }
  }, [query.data])

  return query
}
