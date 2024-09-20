<template>
  <div class="relative inline-block">
    <div @mouseenter="showTooltip" @mouseleave="hideTooltip">
      <slot></slot>
    </div>
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="isVisible" 
           class="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip min-w-[200px] max-w-[300px] text-left break-words"
           :class="[positionClass]">
        {{ content }}
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  }
})

const isVisible = ref(false)

const showTooltip = () => {
  isVisible.value = true
}

const hideTooltip = () => {
  isVisible.value = false
}

const positionClass = computed(() => {
  switch (props.position) {
    case 'top':
      return 'bottom-full left-1/2 transform -translate-x-1/2 mb-1'
    case 'bottom':
      return 'top-full left-1/2 transform -translate-x-1/2 mt-1'
    case 'left':
      return 'right-full top-1/2 transform -translate-y-1/2 mr-1'
    case 'right':
      return 'left-full top-1/2 transform -translate-y-1/2 ml-1'
    default:
      return 'bottom-full left-1/2 transform -translate-x-1/2 mb-1'
  }
})
</script>

<style scoped>
.tooltip-arrow {
  @apply absolute w-2 h-2 bg-gray-900;
}

.tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: inherit;
  visibility: hidden;
}

.tooltip[data-popper-placement^='top'] .tooltip-arrow {
  bottom: -4px;
}

.tooltip[data-popper-placement^='bottom'] .tooltip-arrow {
  top: -4px;
}

.tooltip[data-popper-placement^='left'] .tooltip-arrow {
  right: -4px;
}

.tooltip[data-popper-placement^='right'] .tooltip-arrow {
  left: -4px;
}
</style>