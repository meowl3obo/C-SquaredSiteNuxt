<template>
  <header @mouseleave="controlClassifyDrop(false)">
    <div class="header">
      <nav class="main-nav">
        <div class="nav-start">
          <transition name="ease_top_bottom">
            <ClassifySM v-show="isScrollToBottom || width <= 1024" @controlClassifyDrop="controlClassifyDrop" />
          </transition>
        </div>
        <div>
          <h1 class="logo" :class="isScrollToBottom || width <= 1024 ? 'logo-sm' : ''">
            <a href="/" @click.prevent="toPath('/')">C.Squared</a>
          </h1>
        </div>
        <div class="nav-end">
          <UserControl v-if="width > 1024" />
          <span v-else class="bag">
            <a>BAG</a>
          </span>
        </div>
      </nav>
      <transition name="ease_top_bottom">
        <Classify v-show="!isScrollToBottom && width > 1024" />
      </transition>
      <ClassifyDrop :IsOpen="isShowClassifyDrop" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
@import "@/styles/_animation.scss";
@import "@/styles/_common.scss";
@import url('https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap');

@include mobile {
  header {
    .main-nav {
      padding: 10px;
      .bag {
        cursor: pointer;
        padding: 10px;
        font-weight: bold;
        border-radius: 10px;
        transition: background-color 0.25s ease-in-out;
      }
    }
  }
}
@include pc {
  header {
    .main-nav {
      padding: 10px 20px;
    }
  }
}

header {
  position: fixed;
  width: calc(100% - 40px);
  top: 0;
  padding: 20px;
  transition: height 0.2s ease-out;

  .header {
    border-radius: 10px;
    background-color: var(--bg-color-20);
    backdrop-filter: blur(100px);
    padding-bottom: 5px;
  }

  .main-nav {
    position: relative;
    display: flex;
    justify-content: space-between;

    .nav-start {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-basis: 50%;

      .classify {
        span {
          padding: 15px;
        }
        & > span:nth-child(odd) {
          cursor: pointer;
        }
      }
    }
    .logo {
      font-family: 'Nothing You Could Do', cursive;
      font-size: 54px;
      margin-block: 20px;
      transition: all 0.3s ease-in-out;

      a {
        cursor: pointer;
        text-decoration: none;
        color: var(--main-font);
      }
    }
    .logo-sm {
      font-size: 24px;
      margin-block: 0px;
    }
    .nav-end {
      display: flex;
      justify-content: flex-end;
      flex-basis: 50%;
    }
  }
  .child-classifies {
    position: absolute;
    bottom: -5px;
    transform: translateY(100%);
    width: 100%;
    border-radius: 10px;
    background-color: var(--drop);
    backdrop-filter: blur(100px);
    height: 190px;

    .content {
      position: absolute;
    }

    .child-classify {
      cursor: pointer;
      padding-block: 5px;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, ref, computed } from "vue";
import { useRouter } from 'vue-router'
import { GlobalStore } from "@/store/global";

export default defineComponent({
  components: {
    UserControl: defineAsyncComponent(() => import("./UserControl.vue")),
    Classify: defineAsyncComponent(() => import("./Classify.vue")),
    ClassifySM: defineAsyncComponent(() => import("./ClassifySM.vue")),
    ClassifyDrop: defineAsyncComponent(() => import("./ClassifyDrop.vue")),
  },
  setup() {
    const { GetWidth } = GlobalStore();
    const router = useRouter();
    const width = computed(() => GetWidth())
    const nowScrollTop = ref<number>(0);
    const isScrollToBottom = ref<boolean>(false);
    const isShowClassifyDrop = ref<boolean>(false);

    const toPath = (path: string) => {
      router.push(path)
    }

    const controlClassifyDrop = (newStatus: boolean) => {
      isShowClassifyDrop.value = newStatus
    }

    onMounted(() => {
      nowScrollTop.value = document.documentElement.scrollTop
      window.addEventListener("scroll", () => {
        const newScorllTop = document.documentElement.scrollTop
        if (newScorllTop > nowScrollTop.value) isScrollToBottom.value = true;
        else isScrollToBottom.value = false;
        nowScrollTop.value = newScorllTop
      })
    },)

    return { width, isScrollToBottom, isShowClassifyDrop, toPath, controlClassifyDrop };
  },
});
</script>

