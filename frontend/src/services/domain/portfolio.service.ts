import type {
  ContactPayload,
  ContactResponse,
  PortfolioData,
} from '@/types/portfolio'
import { request } from '@/services/infra/http'

export const portfolioApi = {
  getPortfolio: () => request<PortfolioData>('/public/portfolio/'),
  sendContact: (payload: ContactPayload) =>
    request<ContactResponse>('/public/contact/', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
