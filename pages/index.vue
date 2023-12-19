<template>
  <div id="examples" class="relative flex-1 divide-y-2 divide-gray-200 dark:divide-gray-800">
    <h2 class="pb-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-pink-600">
      Examples of Functionality
    </h2>
    <ExamplesContent id="content" class="py-12" />
    <ExamplesAuth id="authentication" class="py-12" />
    <ExamplesApiRoutes id="api" class="py-12" />
  </div>
  <div id="components" class="relative flex-1 divide-y-2 divide-gray-200 dark:divide-gray-800">
    <h2 class="pb-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-700 to-pink-600">
      Demo of Components
    </h2>
    <ExamplesComponents />
  </div>
</template>

<script setup>
const title = 'Directus & Nuxt 3 Starter'
useHead({
  title: title,
})
</script>
