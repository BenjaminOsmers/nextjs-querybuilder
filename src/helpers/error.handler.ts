export const errorHandler = (code: number) => {
  switch (code) {
    case 403:
      return 'You are not authorized to access this resource'
      break
    case 404:
      return 'Resource not found'
      break
    case 500:
      return 'Internal server error'
      break
    case 401:
      return 'You are not authorized to access this resource'
      break
    default:
      break
  }
}
