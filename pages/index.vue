<template>
  <div>now count: {{ data }}</div>

  <NuxtLink to="/test">前往 test</NuxtLink>
</template>

<script lang="ts">
import { DataStore } from '@/store/data'

export default defineComponent({
  setup() {
    const { GetCount } = DataStore()
    const data = computed(() => GetCount())

    return { data }
  },
})
</script>