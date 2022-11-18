<template>
  <div class="div-classify">
    <div class="classify">
      <span v-if="width > 1024" @mouseenter="controlClassify(true)">
        PRODUCT
      </span>
      <span v-else @click="controlClassify(!isShowClassifyDrop)">
        {{ isShowClassifyDrop ? 'CLOSE' : 'MENU' }}
      </span>
    </div>
    <!-- <transition name="ease_drop"> -->
    <!-- </transition> -->
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";
@import "@/styles/_animation.scss";

@include pc {
  .classify > span {
    &:hover {
      background-color: var(--drop-hover);
    }
  }
}
.div-classify {
  position: relative;
  display: flex;
  justify-content: center;

  .classify {
    span {
      cursor: pointer;
      padding: 10px;
      font-weight: bold;
      border-radius: 10px;
      transition: background-color 0.25s ease-in-out;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, computed } from 'vue'
import { GlobalStore } from "@/store/global";

export default defineComponent({
  components: {
    ClassifyDrop: defineAsyncComponent(() => import("./ClassifyDrop.vue")),
  },
  setup(_, { emit }) {
    const { GetWidth } = GlobalStore()
    const width = computed(() => GetWidth())
    const isShowClassifyDrop = ref<boolean>(false)
    const controlClassify = (isOpen: boolean) => {
      isShowClassifyDrop.value = isOpen
      emit("controlClassifyDrop", isShowClassifyDrop.value)
    }

    return { width, isShowClassifyDrop, controlClassify }
  },
})
</script>
