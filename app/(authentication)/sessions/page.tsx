import { Metadata } from 'next'
import Image from 'next/image'

import { UserAuthForm } from './user-auth-form'

import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Autenticação',
  description: 'Formulários de autenticação construídos usando os componentes.',
}

export default function AuthenticationSessionsPage() {
  return (
    <>
      <Toaster />
      <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        {/* <Link
          href="/register"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute left-4 top-4 md:left-8 md:top-8',
          )}
        >
          Registrar
        </Link> */}

        <div className="mt-80 sm:mt-80 md:mt-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Acesse Sua Conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Insira seu e-mail e senha abaixo para acessar sua conta
              </p>
            </div>
            <UserAuthForm />
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              Ao clicar em entrar, você concorda com nossos
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </Link>
              e
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Política de Privacidade
              </Link>
              .
            </p>
            <p className="text-center text-sm">
              Não tem uma conta?
              <Link
                href="/register"
                className="underline underline-offset-4 hover:text-primary"
              >
                Crie uma agora
              </Link>
              .
            </p> */}
          </div>
        </div>

        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <Image
            src="https://i.postimg.cc/mgh3DJXf/TEMPLATE-1.png"
            fill={true}
            quality={100}
            priority={true}
            alt="Autenticação"
            sizes="(max-width: 768px) 100vw, 50vw" // 100% da viewport em telas <= 768px, e 50% em telas maiores
            className="absolute inset-0 object-cover object-left"
          />

          {/* <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Norte Gases
          </div> */}
          {/* <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Esta biblioteca me salvou incontáveis horas de trabalho e
                me ajudou a entregar designs impressionantes para meus clientes
                mais rápido do que nunca antes.&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div> */}
        </div>
      </div>
    </>
  )
}
