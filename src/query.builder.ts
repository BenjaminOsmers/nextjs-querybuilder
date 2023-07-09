import { errorHandler } from './helpers/error.handler'
import { getTokenFromCookies } from './helpers/getToken'

export class QueryBuilder {
  method: string
  url: string
  body?: string
  cache?: number
  options?: any

  constructor(url: string) {
    this.url = url
    this.method = 'GET'
    this.options = {
      next: {
        revalidate: 0,
      },
    } as any
  }

  isPublic() {
    this.options.headers['Authorization'] = ''
  }

  withCache(cache: number) {
    this.options.next.revalidate = cache
    return this
  }

  withBody(body: any) {
    this.options.body = JSON.stringify(body)
    this.options.headers['Content-Type'] = 'application/json'
    return this
  }

  post() {
    this.options.method = 'POST'
    return this
  }

  delete() {
    this.options.method = 'DELETE'
    return this
  }

  patch() {
    this.options.method = 'PATCH'
    return this
  }

  async build() {
    const token = await getTokenFromCookies()

    if (token) {
      this.options.headers = {
        'Content-Type': 'application/json',
        'X-jwt': `${token}`,
      }
    }

    const res = await fetch(this.url, this.options)

    if (!res.ok) {
      const msg = errorHandler(res.status)
      throw new Error(msg)
    }

    return await res.json()
  }
}
