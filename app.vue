<template>
  <div>
    <Header />
    <div style="margin-top: 195px">
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts">
import { GlobalStore } from "@/store/global";
import { GetClassifies } from '@/library/global/Data'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { SetWidth } = GlobalStore();
    const path = computed(() => route.fullPath)

    onMounted(() => {
      window.addEventListener("resize", windowWidth);
      windowWidth()
    })

    const windowWidth = () => {
      const width = window.innerWidth
      SetWidth(width)
    }

    watch(
      () => path.value,
      () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    )

    GetClassifies()
  },
})
</script>
