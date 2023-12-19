<template>
    <h1 class="section-title">Works</h1>
    <div v-show="loading" class="text-white text-center bg-purple-950 p-4 block w-32 rounded-lg shadow-inner mx-auto">
        <span class="section-title font-bold">Loading...</span>
    </div>
    <div v-show="!loading">
        <div v-for="(work, index) in  works" :key="work.id">
            <h2 class="text-2xl text-black dark:text-white text-center font-bold mb-3">{{ work.title }}</h2>

            <SwiperCarousel :images="work.image"/>
            <div v-html="work.description" class="text-black dark:text-white mt-5"/>
            <div class="h-[1px] mt-6 mb-6"/>
        </div>
    </div>
</template>
<script setup>
import { readItems } from '@directus/sdk';
import SwiperCarousel from '~/components/SwiperCarousel.vue'
const { $directus } = useNuxtApp()
const [{ fileUrl }, { performAsync }] = [useFiles(), useAsyncLoader()]

const [works, loading] = [ref([]), ref(true)]
works.value = await performAsync(loading, 
    $directus.request(readItems('works', { fields: ['*', 'image.images_id.name', 'image.images_id.image'] }))
)
works.value.forEach(work => 
    work.image = work.image.map(i => ({ url: fileUrl(i.images_id.image), alt: i.images_id.description }))
)
</script>
  