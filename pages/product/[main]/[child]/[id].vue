<template>
  <div class="product">
    <div class="img-list">
      <div>
        <div class="img-div" v-for="(item, index) in product?.OtherImgs" :key="index" @mouseenter="productImgMap.set(item, true)" @mouseleave="productImgMap.set(item, false)">
          <button :active="showImgIndex == index" @click="showImgIndex = index">
            <img class="img-option" :src="`${imgBaseUrl}${item}`">
            <transition name="ease_show">
              <div v-show="productImgMap.get(item)" class="img-back"></div>
            </transition>
          </button>
        </div>
      </div>
    </div>
    <div class="img">
      <img v-if="product?.OtherImgs.length > 0" class="img-option" :src="`${imgBaseUrl}${product?.OtherImgs[showImgIndex]}`">
    </div>
    <div class="info">
      <div class="main-classify">{{ product.ParentClassify }}</div>
      <div class="product-name">{{ product.Name }}</div>
      <div class="product-price">TWD {{ product.Price }}</div>
      <div v-if="colorList.length > 0" class="product-color">
        <div class="color-options">
          <div v-for="item in colorList" :key="item" class="option" :active="chooseColor == item" @click="chooseColor = item">
            <div :style="`background-color: ${ColorMap[item]}`" />
          </div>
        </div>
        <div class="color-name">{{ chooseColor }}</div>
      </div>
      <div v-if="sizeList.length > 0" class="product-size">
        <span v-for="item in sizeList" :key="item" class="option" :active="chooseSize == item" @click="chooseSize = item">
          {{ item }}
        </span>
      </div>
      <div v-if="sizeList.length > 0" class="product-unit">{{ sizeUnit }}</div>
      <div class="product-illustrate">
        <span v-html="product.Illustrate"></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_path.scss";
.product {
  display: flex;
  padding-top: 20px;
  & > div {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
  .img-list {
    display: flex;
    justify-content: center;
    align-items: center;
    .img-div {
      position: relative;
      button {
        cursor: pointer;
        border-radius: 15px;
        padding: 5px;
        border: 2px solid transparent;
        background-color: transparent;
        &[active = 'true'] {
          border-color: var(--focus-border);
        }
      }
      .img-back {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: var(--bg-color-40);
      }
      .img-option {
        border-radius: 10px;
        width: 100px;
        height: 100%;
      }
    }
  }
  .img {
    & > img {
      border-radius: 40px;
    }
  }
  .info {
    padding-block: 20px;
    text-align: center;
    & > div {
      padding-block: 5px;
    }
    .main-classify {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 14px;
    }
    .product-name {
      font-weight: 500;
      font-size: 20px;
    }
    .product-price {
      margin-bottom: 40px;
    }
    .color-options,
    .product-size {
      display: grid;
      grid-template-columns: repeat(auto-fit, 17px);
      gap: 40px;
      justify-content: center;
    }
    .product-color,
    .product-size {
      padding-block: 10px;
      margin-inline: auto;
      .option {
        width: 70px;
        cursor: pointer;
        border-radius: 7px;
        border: 2px solid transparent;
        &[active = 'true'] {
          border-color: var(--focus-border);
          box-shadow: 0px 0px 10px var(--focus-border);
        }
      }
    }
    .color-options {
      .option {
        width: 20px;
        height: 20px;
        padding: 3px;
        & > div {
          border-radius: 5px;
          width: 100%;
          height: 100%;
        }
      }
    }
    .color-name {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 600;
    }
    .product-size {
      .option {
        width: 20px;
      }
    }
    .product-illustrate {
      margin-top: 40px;
      :deep(p) {
        margin-block: 3px;
      }
    }
  }
}
</style>

<script lang="ts">
import { GetProduct } from "@/apis/Product";
import { IProduct } from "@/types/product/Product";
import { ColorMap } from "@/config/global/Color"

export default defineComponent({
  setup() {
    const route = useRoute();
    const params = computed(() => route.params);
    const parentID = ref<string>("");
    const childID = ref<string>("");
    const productID = ref<string>("");
    const showImgIndex = ref<number>(0);
    const colorList = ref<Array<string>>([])
    const sizeList = ref<Array<number>>([])
    const sizeUnit = ref<string>("")
    const chooseColor = ref<string>("")
    const chooseSize = ref<number>(0)
    const productImgMap = ref<Map<string, boolean>>(new Map<string, boolean>())
    const product = reactive<IProduct>({
      ChildClassify: "",
      Id: "",
      Intro: "",
      IsNew: false,
      IsSale: false,
      MainImg: "",
      Name: "",
      ParentClassify: "",
      Price: 0,
      Status: 0,
      Illustrate: "",
      OtherImgs: [],
      Inventorys: [],
    });
    const imgBaseUrl = import.meta.env.VITE_IMG

    const setID = () => {
      parentID.value = params.value["main"] ? (params.value["main"] as string) : "";
      childID.value = params.value["child"] ? (params.value["child"] as string) : "";
      productID.value = params.value["id"] ? (params.value["id"] as string) : "";
    };

    const getProduct = async () => {
      const { data, error } = await GetProduct(productID.value);
      if (!error.value && data.value != null) {
        const dataValue = data.value as IProduct
        console.log(dataValue)
        product.ChildClassify = dataValue.ChildClassify
        product.Id = dataValue.Id
        product.Intro = dataValue.Intro
        product.IsNew = dataValue.IsNew
        product.IsSale = dataValue.IsSale
        product.MainImg = dataValue.MainImg
        product.Name = dataValue.Name
        product.ParentClassify = dataValue.ParentClassify
        product.Price = dataValue.Price
        product.Status = dataValue.Status
        product.Illustrate = dataValue.Illustrate
        product.OtherImgs = dataValue.OtherImgs
        product.Inventorys = dataValue.Inventorys
      }
      product.OtherImgs.forEach((item) => {
        productImgMap.value.set(item, false)
      })
      product.Inventorys.forEach((item) => {
        if (item.Color != "" && !colorList.value.includes(item.Color)) colorList.value.push(item.Color)
        if (item.Size != 0 && !sizeList.value.includes(item.Size)) {
          sizeList.value.push(item.Size)
          sizeUnit.value = item.Unit
        }
      })
      sizeList.value.sort((a, b) => { return a - b })
      chooseColor.value = colorList.value.length > 0 ? colorList.value[0] : ""
      chooseSize.value = sizeList.value.length > 0 ? sizeList.value[0] : 0
    };

    const random = (): number => {
      return Math.floor(Math.random() * 4)
    }

    onMounted(async () => {
      setID();
      getProduct();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    return { ColorMap, showImgIndex, productImgMap, colorList, sizeList, sizeUnit, chooseColor, chooseSize, product, imgBaseUrl, random }
  },
});
</script>
