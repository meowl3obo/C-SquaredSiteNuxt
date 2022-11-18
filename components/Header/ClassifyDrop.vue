<template>
  <div class="classifies" :class="isOpen ? 'm-open-classies' : 'm-close-classies'">
    <div class="content">
      <div class="classify" v-if="width <= 1024" >
        <input type="text" placeholder="Search">
      </div>
      <div class="classify">
        <div class="classify-title">Sale</div>
      </div>
      <div class="classify">
        <div class="classify-title">New</div>
      </div>
      <div v-for="item in classifies" :key="item.Id" class="classify">
        <div class="classify-title">
          <a :href="`/product/${item.Id}`" @click.prevent="toPath(`/product/${item.Id}`)">{{ item.Name }}</a>
        </div>
        <template v-if="width > 1024">
          <div v-for="item2 in item.Child" :key="item2.Id" class="child-classify">
            <a :href="`/product/${item.Id}/${item2.Id}`" @click.prevent="toPath(`/product/${item.Id}/${item2.Id}`)">{{ item2.Name }}</a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";
@include mobile {
  .classifies {
    bottom: -10px;
    width: 100%;
    .classify-title {
      font-size: 20px;
      opacity: .9;
    }
  }
  .m-open-classies {
    padding-block: 10px;
    height: calc(100vh - 25px);
  }
}
@include pc {
  .classifies {
    bottom: 0px;
    width: calc(100vw - 80px);
    .content {
      display: flex;
      .classify-title {
        opacity: .6;
      }
    }
  }
  .m-open-classies {
    height: 250px;
  }
}
.m-close-classies {
  padding-block: 0px;
  height: 0;
}
.classifies {
  left: -10px;
  border-radius: 10px;
  background-color: var(--drop-60);
  backdrop-filter: blur(100px);
  box-shadow: 0px 0px 10px var(--drop-60);
  overflow: hidden;
  transition: all 0.2s ease-out;

  .content {
    padding-inline: 10px;

    & > div {
      min-width: 150px;
    }
  }

  .classify {
    padding: 5px 10px;
    border-radius: 10px;
    font-weight: bold;
    
    a {
      text-decoration: unset;
      color: var(--main-font);
    }

    .classify-title {
      cursor: pointer;
      padding: 5px 10px;
    }
    .child-classify {
      cursor: pointer;
      opacity: .9;
      margin-top: 3px;
      padding: 5px 10px;
      border-radius: 10px;
      transition: background-color 0.25s ease-in-out;
      &:hover {
        background-color: var(--drop-hover);
      }
    }

    input {
      width: 100%;
      &::placeholder {
        text-align: center;
      }
    }
  }
}
</style>

<script lang="ts">
import { Ref } from 'vue'
import { ProductStore } from "@/store/product";
import { GlobalStore } from "@/store/global";

export default defineComponent({
  props: {
    IsOpen: Boolean
  },
  setup(props) {
    const isOpen = toRefs(props).IsOpen as Ref<boolean>
    const { GetClassify } = ProductStore()
    const { GetWidth } = GlobalStore()
    const router = useRouter()
    const width = computed(() => GetWidth())
    const classifies = computed(() => GetClassify());
    
    const toPath = (path: string) => {
      router.push(path)
    }

    return { width, classifies, isOpen, toPath }
  },
})
</script>
