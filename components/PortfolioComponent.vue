<template>
    <h1 class="section-title ml-14" v-if="data.works?.length ?? 0 > 0">Works</h1>
    <div v-show="pending" class="text-white text-center bg-purple-950 p-4 block w-32 rounded-lg shadow-inner mx-auto">
        <span class="section-title font-bold">Loading...</span>
    </div>
    <div v-show="!pending">
        <div v-for="(work, index) in  data.works" :key="work.id"
            v-intersection-observer="(i) => onIntersectionObserver(i, work)">
            <div :class="[{
                'animate-show': work.isVisible,
                'animate-hide-left': index % 2 == 0,
                'animate-hide-right': index % 2 != 0
            }]">
                <h2 class="text-2xl text-white text-center font-bold mb-3">{{ work.title }}</h2>

                <SwiperCarousel :images="work.image" class="delay-200" />
                <div v-html="work.description" class="text-white mt-5 delay-400" />
                <div class="h-[1px] mt-6 mb-6" />
            </div>
        </div>
    </div>
</template>
<script setup>
import SwiperCarousel from '~/components/SwiperCarousel.vue'
import { vIntersectionObserver } from '@vueuse/components'
import { readItems } from '@directus/sdk';
const { $directus } = useNuxtApp()
const [{ fileUrl }, { softFetch }] = [useFiles(), useAsyncLoader()]

const { pending, data } = await useLazyAsyncData('works', async () => {
    const items = await softFetch($directus.request(readItems('works', { fields: ['*', 'image.images_id.name', 'image.images_id.image'] })))
    items.forEach(work => {
        work.image = work.image.map(i => ({ url: fileUrl(i.images_id.image), alt: i.images_id.description }))
        work.isVisible = ref(false)
    })
    return { works: items }
})
const onIntersectionObserver = (observer, work) => {
    if (work.isVisible) return
    work.isVisible = ref(observer[0].isIntersecting)
}


</script>
<style scoped>
@media (prefers-reduced-motion: reduce) {

    .animate-hide-left,
    .animate-hide-right,
    .animate-show-left {
        transition: none !important;
    }
}

.animate-hide-left,
.animate-hide-right {
    opacity: 0;
    filter: blur(0.5rem);
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out, filter 0.5s ease-in-out;
}

.animate-hide-left {
    transform: translateX(100%);
}

.animate-hide-right {
    transform: translateX(-100%);
}

.animate-show {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0) translateY(0);
}
</style>
