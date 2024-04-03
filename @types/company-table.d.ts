export interface Company {
  id: string
  name: string
  cnpj: string
  contact_number: string | null
  contact_email: string | null
}

export interface GetCompanyResponse {
  company: Company
}

export interface FetchCompanyResponse {
  companies: Company[]
}
