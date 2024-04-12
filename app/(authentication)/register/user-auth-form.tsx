'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/icons'

// Definição do esquema de validação usando Zod
const UserAuthFormSchema = z.object({
  name: z.string().min(1, 'O campo nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type UserAuthFormValues = z.infer<typeof UserAuthFormSchema>

export function UserAuthForm(props: React.HTMLAttributes<HTMLDivElement>) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<UserAuthFormValues>({
    resolver: zodResolver(UserAuthFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async () => {
    // Adicionando delay de 2 segundos antes de prosseguir
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // console.log(values) // Aqui, você pode enviar os dados para sua API ou serviço
    reset() // Limpa os campos do formulário após a submissão
  }

  return (
    <div className={cn('grid gap-6', props.className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
        <div className="grid gap-1">
          <Label htmlFor="name" className="sr-only">
            Nome
          </Label>
          <Input
            {...register('name')}
            id="name"
            placeholder="Seu nome completo"
            type="text"
            disabled={isSubmitting}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="grid gap-1">
          <Label htmlFor="email" className="sr-only">
            E-mail
          </Label>
          <Input
            {...register('email')}
            id="email"
            placeholder="nome@exemplo.com"
            type="email"
            disabled={isSubmitting}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password" className="sr-only">
            Senha
          </Label>
          <Input
            {...register('password')}
            id="password"
            placeholder="Sua senha"
            type="password"
            disabled={isSubmitting}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <Button disabled={isSubmitting}>
          {isSubmitting && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Criar
        </Button>
      </form>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading}>
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}
        GitHub
      </Button> */}
    </div>
  )
}
