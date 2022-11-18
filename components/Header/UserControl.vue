<template>
  <div class="user-control">
    <span title="APP">
      <icon :icon="['fas', 'mobile-screen-button']" />
    </span>
    <span title="Shpooing Cart">
      <icon :icon="['fas', 'cart-shopping']" />
    </span>
    <span title="User">
      <icon :icon="['far', 'user']" />
    </span>
    <span title="Feedback">
      <icon :icon="['far', 'message']" />
    </span>
    <span title="Search">
      <icon :icon="['fas', 'magnifying-glass']" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.user-control {
  & > span {
    cursor: pointer;
    padding: 15px;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
  },
})
</script>
