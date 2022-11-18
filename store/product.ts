import { defineStore } from 'pinia'
import { IParentClassify } from '@/types/product/Classify'

export const ProductStore = defineStore('product', () => {
  /* state */
  const classify = ref<Array<IParentClassify>>([])
  /* getter */
  const GetClassify = () => {
    return classify.value
  }

  /* actions */
  const SetClassify = (val: Array<IParentClassify>) => {
    classify.value = val
  }

  return { GetClassify, SetClassify }
})