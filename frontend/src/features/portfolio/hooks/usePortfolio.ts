import { useQuery } from '@tanstack/react-query'
import { PORTFOLIO_FALLBACK } from '@/data/portfolio.fallback'
import { portfolioApi } from '@/services/api'
import type { PortfolioData } from '@/types/portfolio'

interface UsePortfolioOptions {
  enabled?: boolean
}

export function usePortfolio({ enabled = true }: UsePortfolioOptions = {}) {
  return useQuery<PortfolioData>({
    queryKey: ['portfolio'],
    enabled,
    queryFn: async () => {
      try {
        return await portfolioApi.getPortfolio()
      } catch (error) {
        // API indisponível — usa dados locais para o site não quebrar
        console.warn('[portfolio] API indisponível, usando fallback local.', error)
        return PORTFOLIO_FALLBACK
      }
    },
    retry: 3,
    retryDelay: (attempt) => Math.min(1500 * 2 ** attempt, 8000),
    staleTime: 5 * 60_000,
  })
}
