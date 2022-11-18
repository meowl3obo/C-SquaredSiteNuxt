import { defineStore } from 'pinia'

export const DataStore = defineStore('data', () => {
  /* state */
  const count = ref<number>(0)

  /* getter */
  const GetCount = () => {
    return count.value
  }

  /* actions */
  const SetCount = (val: number) => {
    count.value = val
  }

  return { GetCount, SetCount }
})