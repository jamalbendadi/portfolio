<template>
  <div class="min-h-screen transition duration-150 bg-white dark:bg-slate-900">
    <div class="relative max-w-6xl px-6 pt-12 pb-24 mx-auto space-y-8">
      <MainHeader title="Directus & Nuxt 3 Starter" />
      <slot />
      <MainFooter title="Directus & Nuxt 3 Starter" />
    </div>
  </div>
</template>
<script setup>
import 'swiper/css';
</script>