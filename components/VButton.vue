<template>
  <button @click="handleClick" :type="type" :class="[
    'btn',
    {
      'btn-default': variant === 'default',
      'btn-primary': variant === 'primary',
      'btn-outline': variant === 'outline',
      'btn-danger': variant === 'danger',
    },
  ]">
    <slot />
  </button>
</template>

<script setup lang="ts">
const router = useRouter()
const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'default',
  },
  href: {
    type: String,
    required: false, 
  },
})
const handleClick = () => {
  if(!props.href) return
  router.push(props.href)
}
</script>

<style>
/* Using Tailwind @apply so we can easily re-use these styles for other 'button' based components like VDropdown */
.btn {
  @apply z-0 inline-flex items-center px-6 py-4 text-base font-medium focus:outline-none focus:ring-1 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed active:hover:scale-95 transition ease-in-out duration-150 active:hover:z-50 focus:z-50;
}

.btn-default {
  @apply text-primary-700 bg-primary-100 hover:bg-primary-200;
}

.btn-primary {
  @apply text-white bg-primary-600 hover:bg-primary-700;
}

.btn-outline {
  @apply text-primary-700 bg-transparent border-2 border-primary-500 hover:border-primary-700 hover:text-primary-900 dark:text-primary-500 dark:hover:text-primary-700 focus:ring-primary-400;
}

.btn-danger {
  @apply text-white bg-red-600 hover:bg-red-700 focus:ring-red-500;
}

.rounded {
  @apply rounded-md shadow-sm;
}
</style>
