<template>
  <div>
    <Header />
    <div style="margin-top: 195px">
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, onMounted } from 'vue'
import { GlobalStore } from "@/store/global";
import { GetClassifies } from '@/library/global/Data'

export default defineComponent({
  components: {
    Header: defineAsyncComponent(() => import('@/components/global/header/Header.vue'))
  },
  setup() {
    const { SetWidth } = GlobalStore();

    onMounted(() => {
      window.addEventListener("resize", windowWidth);
      windowWidth()
    })

    const windowWidth = () => {
      const width = window.innerWidth
      SetWidth(width)
    }

    GetClassifies()
  },
})
</script>
