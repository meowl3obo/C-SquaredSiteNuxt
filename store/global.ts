import { defineStore } from 'pinia'

export const GlobalStore = defineStore('global', () => {
  /* state */
  const width = ref<number>(0)
  /* getter */
  const GetWidth = () => {
    return width.value
  }

  /* actions */
  const SetWidth = (val: number) => {
    width.value = val
  }

  return { GetWidth, SetWidth }
})