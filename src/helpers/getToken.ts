'use server'
import { cookies } from 'next/headers'

export const getTokenFromCookies = async () => {
  const token = cookies().get('token')

  return token?.value
}
