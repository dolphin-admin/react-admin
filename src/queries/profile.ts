import { STALE } from '.'

interface Options {
  did?: string
}

export const profileQK = (did?: string) => ['profile', did]

export function useProfileQuery({ did }: Options) {
  return useQuery({
    queryKey: profileQK(did),
    queryFn: () => UserAPI.profile(),
    staleTime: STALE.MINUTES.FIVE,
    enabled: !!did,
    select: ({ data }) => data
  })
}
