import { useQuery } from '@tanstack/react-query'
import { portfolioApi } from '@/services/api'
import type { PortfolioData } from '@/types/portfolio'

export function usePortfolio() {
  return useQuery<PortfolioData>({
    queryKey: ['portfolio'],
    queryFn: () => portfolioApi.getPortfolio(),
  })
}
