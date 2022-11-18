<template>
  <div class="div-classify" @mouseleave="parentHover('')">
    <div class="classify">
      <span @mouseenter="parentHover('')">Sale</span>
      <span>|</span>
      <span @mouseenter="parentHover('')">New</span>
      <span>|</span>
      <template v-for="(item, index) in classifies" :key="item.Id">
        <span @mouseenter="(e) => {parentHover(item.Id, e)}">
          <a :href="`/product/${item.Id}`" @click.prevent="toPath(`/product/${item.Id}`)">{{ item.Name }}</a>
        </span>
        <span v-if="index+1 < classifies.length">
          |
        </span>
      </template>
    </div>
    <div class="child-classifies" :class="isOpen ? 'm-open-classies' : 'm-close-classies'"> 
      <div class="content" :style="`left: ${childLeft}px`">
        <div v-for="item in childClassify" :key="item.Id" class="child-classify">
          <a :href="`/product/${parentID}/${item.Id}`" @click.prevent="toPath(`/product/${parentID}/${item.Id}`)">{{ item.Name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-open-classies {
  padding-block: 10px;
  height: 190px;
}

.m-close-classies {
  padding-block: 0px;
  height: 0;
}

.div-classify {
  position: relative;
  text-align: center;

  .classify {
    span {
      padding: 10px;
      a {
        text-decoration: unset;
        color: var(--main-font);
      }
    }
    & > span:nth-child(odd) {
      cursor: pointer;
    }
  }
  .child-classifies {
    // position: absolute;
    position: relative;
    bottom: -5px;
    width: 100%;
    border-radius: 20px;
    background-color: var(--drop-60);
    box-shadow: 0px 0px 10px var(--drop-60);
    overflow: hidden;
    transition: all 0.2s ease-out;

    .content {
      position: absolute;
    }

    .child-classify {
      cursor: pointer;
      padding: 5px 10px;
      border-radius: 10px;
      transition: background-color 0.25s ease-in-out;

      a {
        text-decoration: unset;
        color: var(--main-font);
      }

      &:hover {
        background-color: var(--drop-hover);
      }
    }
  }
}
</style>

<script lang="ts">
import { ProductStore } from "@/store/product";
import { IChildClassify } from "@/types/product/Classify";

export default defineComponent({
  setup() {
    const router = useRouter()
    const { GetClassify } = ProductStore()
    const classifies = computed(() => GetClassify());
    const childClassify = ref<Array<IChildClassify>>([]);
    const childLeft = ref<number>(0);
    const parentID = ref<string>("");
    const isOpen = ref<boolean>(false);

    const parentHover = (hoverParentID: string, e?: MouseEvent): void => {
      parentID.value = hoverParentID
      const classify = classifies.value.find((x) => x.Id == hoverParentID);
      if (classify && classify.Child.length > 0 && e) {
        isOpen.value = true
        const path = e.composedPath() as Array<HTMLElement>
        childClassify.value = classify.Child
        childLeft.value = path[0].offsetLeft - 7
      } else {
        isOpen.value = false
        childClassify.value = []
      }
    }

    const toPath = (path: string) => {
      router.push(path)
    }

    return { classifies, childClassify, childLeft, parentID, isOpen, parentHover, toPath }
  },
})
</script>
