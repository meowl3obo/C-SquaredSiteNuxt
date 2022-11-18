<template>
  <div>
    <div class="classify-title">
      <h1>{{ parentName }} <span v-if="childName && childName != ''">/</span> {{ childName }}</h1>
    </div>
    <div class="product-content">
      <NuxtPage />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";
@include mobile {
  .product-content {
    padding-inline: 10px;
  }
}
@include pc {
  .product-content {
    padding-inline: 200px;
  }
}
.classify-title {
  text-align: center;
}
</style>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
// import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { IParentClassify } from "@/types/product/Classify";

export default defineComponent({
  setup() {
    const route = useRoute()
    // const store = useStore()
    // const classifies = computed(() => store.getters["Product/GetClassify"] as Array<IParentClassify>);
    const classifies = ref<Array<IParentClassify>>([])
    const params = computed(() => route.params)
    const parentID = ref<string>("")
    const childID = ref<string>("")
    const parentName = computed(() => classifies.value.find((x) => x.Id.toString() == parentID.value)?.Name as string)
    const childName = computed(() => {
      let child = ''
      const parent = classifies.value.find((x) => x.Id.toString() == parentID.value)
      if (parent) {
        child = parent.Child.find((x) => x.Id.toString() == childID.value)?.Name as string
      }
      return child
    })


    const setID = () => {
      parentID.value = params.value['main'] ? params.value['main'] as string : ''
      childID.value = params.value['child'] ? params.value['child'] as string : ''
    }

    onMounted(async () => {
      setID()
    })


    watch(
      () => { return params.value },
      () => {
        setID()
      },
      { deep: true}
    )

    return { parentName, childName }
  },
})
</script>