interface SocialMedia {
  name: string
  url: string
}

export interface Company {
  name: string
  cnpj: string
  address: {
    street: string
    number: number
    complement?: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  socialMedia: SocialMedia[]
  contactPhone: string
  billingEmail?: string
  logisticsEmail: string
  corporateEmail: string
  financialEmail: string
  stateRegistration?: string
  responsiblePersonName: {
    name: string
    contact: string
  }
  createdAt: string
  updatedAt: string
}
