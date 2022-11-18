<template>
  <div>
    <div v-for="item in productList" :key="item.Id" class="product">
      <div>
        <img :src="item.MainImg">
      </div>
      <div>
        <span>{{ item.Name }}</span>
      </div>
      <div>
        <span>TWD {{ item.Price }}</span>
      </div>
      {{ item }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  text-align: center;
}
</style>

<script lang="ts">
import { GetProductList } from '@/apis/Product'
import { IGetProductsQuery, IProductIntro } from '@/types/product/Product'

export default defineComponent({
  setup() {
    const route = useRoute()
    const params = computed(() => route.params)
    const parentID = ref<string>("")
    const childID = ref<string>("")
    const productList = ref<Array<IProductIntro>>([])

    const setID = () => {
      parentID.value = params.value['main'] ? params.value['main'] as string : ''
      childID.value = params.value['child'] ? params.value['child'] as string : ''
      console.log(parentID.value, childID.value)
    }

    const getProductList = async () => {
      const query: IGetProductsQuery = {}
      if (childID.value != '') query.child = childID.value
      const { data, error } = await GetProductList(parentID.value, query)
      if (!error.value && data.value != null) {
        productList.value = data.value as Array<IProductIntro>
      }
    }

    onMounted(async () => {
      setID()
      getProductList()
    })


    watch(
      () => { return params.value },
      () => {
        setID()
        getProductList()
      },
      { deep: true}
    )

    return { productList }
  },
})
</script>
