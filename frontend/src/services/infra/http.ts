export const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1'

export async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    const message =
      typeof errorBody === 'object' && errorBody !== null && 'detail' in errorBody
        ? String((errorBody as { detail: unknown }).detail)
        : `Erro ${response.status}`
    throw new Error(message)
  }

  return response.json() as Promise<T>
}
