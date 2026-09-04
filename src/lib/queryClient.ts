import { QueryClient } from '@tanstack/react-query'

// Shared TanStack Query client for all TMDB requests.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
