import { CompanySchema } from '@/schemas/company'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem } from './ui/form'
import { Input } from './ui/input'
import createNewComapny from '@/services/company/create-new-company'
import { Button } from './ui/button'

type CompaniesFormValues = z.infer<typeof CompanySchema>

export default function CompanyForm() {
  const form = useForm<CompaniesFormValues>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: 'Tech Solutions Ltda.',
      cnpj: '12.345.678/0001-90',
      address: {
        street: 'Av. Paulista',
        number: '1000',
        complement: '10º andar',
        neighborhood: 'Bela Vista',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100',
      },
      socialMedia: [
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/techsolutions',
        },
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/company/techsolutions',
        },
      ],
      contactPhone: '(11) 4002-8922',
      billingEmail: 'faturamento@techsolutions.com.br',
      logisticsEmail: 'logistica@techsolutions.com.br',
      corporateEmail: 'corporativo@techsolutions.com.br',
      financialEmail: 'financeiro@techsolutions.com.br',
      stateRegistration: '123456789',
      responsiblePersonName: {
        contact: '(11) 4002-8923',
        name: 'Carlos Silva',
      },
      createdAt: '2021-01-01',
      updatedAt: '2023-01-01',
    },
  })

  async function onSubmit(values: CompaniesFormValues) {
    toast('Empresa adicionada com sucesso! ✅')
    form.reset()

    console.table(values)

    createNewComapny(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <h3 className="text-lg font-bold leading-6 text-gray-900">
              Dados Empresariais
            </h3>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Nome da Empresa"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="cnpj"
                    placeholder="CNPJ"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contactPhone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="contactPhone"
                    placeholder="Conta da Empresa"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="billingEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="billingEmail"
                    placeholder="Email cobrança"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="logisticsEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="logisticsEmail"
                    placeholder="Email de Logistica"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="corporateEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="corporateEmail"
                    placeholder="Email Corporativo"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="financialEmail"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="financialEmail"
                    placeholder="Email financeiro"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stateRegistration"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="stateRegistration"
                    placeholder="Inscrição Estadual"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Pessoa Responsável e Redes Sociais */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="col-span-2">
            <h3 className="text-lg font-bold leading-6 text-gray-900">
              Responsável
            </h3>
          </div>
          <FormField
            control={form.control}
            name="responsiblePersonName.name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="responsiblePersonName"
                    placeholder="Nome Responsável"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Campo Contato da Pessoa Responsável */}
          <FormField
            control={form.control}
            name="responsiblePersonName.contact"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="responsiblePersonContact"
                    placeholder="Contato Responsável"
                    {...field}
                    className="px-3 py-2"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Endereço */}
        <div className="">
          <div className="col-span-2 pt-2">
            <h3 className="text-lg font-bold leading-6 text-gray-900 pb-4">
              Endereço
            </h3>
            <div className="md:col-span-2 pb-4">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="street"
                        placeholder="Rua"
                        {...field}
                        className="px-3 py-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="number"
                        placeholder="Numero"
                        {...field}
                        className="px-3 py-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.complement"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="complement"
                        placeholder="Complemento"
                        {...field}
                        className="px-3 py-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="neighborhood"
                        placeholder="Bairro"
                        {...field}
                        className="px-3 py-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="city"
                        placeholder="Cidade"
                        {...field}
                        className="px-3 py-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="state"
                        placeholder="Estado"
                        {...field}
                        className="px-3 py-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="zipCode"
                        placeholder="CEP"
                        {...field}
                        className="px-3 py-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Outros campos de endereço aqui... */}
            </div>
          </div>
        </div>
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  )
}
