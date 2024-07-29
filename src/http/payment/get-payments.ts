import { api } from '../api-client'

interface GetPaymentsRequest {
  page: number
  status?: string | null
  description?: string | null
  to?: string | null
  from?: string | null
  vehicle?: string | null
}

type PaymentedStatus =
  | 'Pending'
  | 'InProcess'
  | 'Completed'
  | 'OnHold'
  | 'Canceled'
  | 'Failed'

type PaymentMethod = 'Boleto' | 'Transfer' | 'Card' | 'Cash' | 'Pix'

interface GetPaymentsResponse {
  payments: {
    id: string
    amount: number
    description: string | null
    paymentDate: Date | null
    paymentMethod: PaymentMethod | null
    status: PaymentedStatus
    maintenance_id: string | null
    created_at: Date
    updated_at: Date
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getPayments({
  description,
  status,
  page,
  vehicle,
}: GetPaymentsRequest) {
  const params: Record<string, string | number> = {
    page,
    ...(description && { description }),
    ...(vehicle && { vehicle }),
    ...(status && status !== 'All' && { status }),
  }

  const result = await api
    .get('payments', {
      next: {
        tags: ['payments'],
      },
      searchParams: params,
    })
    .json<GetPaymentsResponse>()

  return result
}
