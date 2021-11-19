<template>
  <div class="dropdown" ref="dropdownRef">
    <a class="btn btn-outline-light my-2 dropdown-toggle" href="#" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul v-if="isOpen" class="dropdown-menu" :style="{ display: 'block' }">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  name: 'dropdown',
  props: {
    title: {
      type: String,
      default: '',
      require: true,
    },
  },
  setup() {
    const isOpen = ref(false)
    // 和 ref 同名的响应式对象，就可以拿到对应的 DOM 节点
    const dropdownRef = ref<null | HTMLElement>(null)

    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }

    const isClickOutside = useClickOutside(dropdownRef)

    if (isOpen.value && isClickOutside.value) {
      isOpen.value = false
    }

    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })

    return {
      isOpen,
      toggleOpen,
      dropdownRef,
    }
  },
})
</script>

<style scoped lang="scss"></style>
