import { $service } from "./index"
import { IGetProductsQuery } from '@/types/product/Product'

export const GetClassifiesApi = async () => {
  const response = await $service('GET', '/v1/classify')
  return response
}

export const GetProductList = async (parentID: string, query: IGetProductsQuery) => {
  const response = await $service('GET', `/v1/products/${parentID}`, { params: query })
  return response
}

export const GetProduct = async (productID: string) => {
  const response = await $service('GET', `/v1/product/${productID}`, {})
  return response
}