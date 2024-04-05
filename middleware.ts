'use server'

import { NextResponse, NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  // Obtém o caminho da URL da requisição
  const path = request.nextUrl.pathname
  // Tenta recuperar o token do cookie
  const token = request.cookies.get('@auth_accessToken')?.value || ''

  // Define quais são os caminhos públicos (acessíveis sem autenticação)
  const isPublicPath = ['/sessions', '/register'].includes(path)

  // Se o caminho for público e o token existir, redireciona para o dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

  // Se o caminho não for público e não houver token, redireciona para a página de login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/sessions', request.nextUrl))
  }

  // Continua a requisição se nenhuma das condições acima for atendida
  return NextResponse.next()
}

// Configuração do middleware para especificar quais rotas ele deve interceptar
export const config = {
  matcher: [
    '/',
    '/drivers/:path*',
    '/vehicles/:path*',
    '/company/:path*',
    '/dashboard/:path*',
    '/payment/:path*',
  ],
}
