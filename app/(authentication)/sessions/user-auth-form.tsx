'use client'

import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/icons'
import { Toaster } from '@/components/ui/sonner'
import { AuthContext } from '@/context/auth-context'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import notifications from '@/utils/ notifications'

const UserAuthFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

type UserAuthFormValues = z.infer<typeof UserAuthFormSchema>

export function UserAuthForm(props: React.HTMLAttributes<HTMLDivElement>) {
  const { signIn } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<UserAuthFormValues>({
    resolver: zodResolver(UserAuthFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function onSubmit(values: UserAuthFormValues) {
    try {
      await authenticate(values)
      reset()
    } catch (err) {
      toast.error(notifications.authentication.error)
    }
  }

  return (
    <div className={cn('grid gap-6', props.className)} {...props}>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
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
          Entrar
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
