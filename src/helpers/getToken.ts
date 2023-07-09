'use server'
import { cookies, headers } from 'next/headers'

export const getTokenFromCookies = () => {
  const token = cookies().get('token')

  return token?.value
}

export const getTokenFromHeaders = () => {
  const headersList = headers()
  const token = headersList.get('x-jwt')

  return token
}
