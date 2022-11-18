import { allowedMethods, timeoutSec, headers, apiUrl, formDataHeaders, Method } from "@/config/global/Http";
import { IPayload } from "@/types/Http"

export const $service = async (method: Method, url: string, payload: IPayload = {}) => {
  if (!allowedMethods.includes(method)) throw new Error(`Not allowedMethods: ${method}`)
  try {
    const response = await useFetch(`${apiUrl}${url}`, {
      headers: headers,
      method: method,
      params: payload.params,
      body: payload.body,
      initialCache: false,
    })
    return response
  } catch (err) {
    throw err
  }
}