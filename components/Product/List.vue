<template>
  <div class="product-list">
    <div v-for="item in productList" :key="item.Id" class="product">
      <div class="img-div" :class="`path-${random()}`" @mouseenter="productImgMap.set(item.Id, true)" @mouseleave="productImgMap.set(item.Id, false)">
        <img :src="`${imgBaseUrl}${item.MainImg}`">
        <transition name="ease_show">
          <div v-show="productImgMap.get(item.Id)" class="img-back"></div>
        </transition>
      </div>
      <div class="intro">
        <div>
          <span>{{ item.Name }}</span>
        </div>
        <div>
          <span>TWD {{ item.Price }}</span>
        </div>
      </div>
      <!-- {{ item }} -->
    </div>
    <template v-if="productList.length < 4 && productList.length > 1">
      <div v-for="index in (4 - productList.length)" :key="index" class="product"/>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";
@import "@/styles/_animation.scss";
@import "@/styles/_path.scss";
@include mobile {
  .product-list {
    padding-inline: 5%;
    gap: 15px;
  }
}
@include pc {
  .product-list {
    padding-inline: 25%;
    gap: 35px;
  }
}
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
.product {
  cursor: pointer;
  text-align: center;
  max-width: 300px;

  .img-div {
    position: relative;
    img {
      width: 100%;
    }
    .img-back {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: var(--bg-color-40);
    }
  }
  .intro {
    padding-block: 10px;
    font-weight: bold;
    color: var(--content-font);
    & > div {
      padding-block: 3px;
    }
  }
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
    const productImgMap = ref<Map<string, boolean>>(new Map<string, boolean>())
    const imgBaseUrl = import.meta.env.VITE_IMG

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
        productList.value.forEach((item) => {
          productImgMap.value.set(item.Id, false)
        })
      }
    }

    const random = (): number => {
      return Math.floor(Math.random() * 4)
    }

    onMounted(async () => {
      setID()
      getProductList()
      window.scrollTo({top: 0, behavior: 'smooth'});
    })

    watch(
      () => { return params.value },
      () => {
        setID()
        getProductList()
      },
      { deep: true}
    )

    return { productList, productImgMap, imgBaseUrl, random }
  },
})
</script>
