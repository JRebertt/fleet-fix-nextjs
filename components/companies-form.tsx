import { CompanySchema } from '@/schemas/company'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export async function CompaniesForm() {
  const form = useForm({
    resolver: zodResolver(CompanySchema),
  })

  return <form action=""></form>
}
