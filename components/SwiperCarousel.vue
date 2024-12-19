<template>
    <swiper class="h-[13rem] w-[20rem] lg:h-[28rem] lg:w-[40rem]" :effect="'cards'" :grabCursor="true"
        :modules="modules" :autoplay="{ delay: 5000, disableOnInteraction: true }">
        <swiper-slide v-for="(image, index) in images" :key="index">
            <div class="neon-border">
                <div class="rounded-md py-2"
                    :style="{ backgroundColor: colors[(index + Math.floor(Math.random())) % colors.length] }">
                    <img loading="lazy" :src="image.url" :alt="image.alt"
                        class="object-contain rounded-md shadow-lg animate-fade-in h-[12rem] lg:h-[26rem] w-[19rem] lg:w-[39rem]"
                        v-show="loaded[index]" />
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>
<script setup lang="ts">

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Pagination, Autoplay } from 'swiper/modules';
import { isLoaded } from '~/utils/images';

const props = withDefaults(defineProps<{
    images: {
        url: string,
        alt: string
    }[]
}>(), {
    images: () => []
})



const images = ref(props.images)
const modules = ref([EffectCards, Pagination, Autoplay])
const colors = [
    'rgb(69, 7, 93, 0.90)',
    'rgb(6, 46, 78, 0.90)',
    'rgb(8, 68, 30, 0.90)',
    'rgb(211, 122, 7, 0.90)',
    'rgb(118, 163, 12, 0.90)',
    'rgb(180, 10, 47, 0.90)',
    'rgb(35, 99, 19, 0.90)',
    'rgb(0, 68, 255, 0.90)',
    'rgb(218, 12, 218, 0.90)',
    'rgb(54, 94, 77, 0.90)'
]
const loaded = ref(Array.from({ length: images.value.length }, () => false))
onMounted(async () => {
    loaded.value = await isLoaded(images.value.map(image => image.url))
})
</script>
<style scoped>

.swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    color: rgb(8, 68, 30);
}

.neon-border {
    position: relative;
    border-radius: 0.375rem;
    /* Matches Tailwind's rounded-sm */
    background: #000;
    /* Inner content background */
    z-index: 0;
    animation: neon-border 3s infinite;

}

.neon-border::before {
    --angle: 90deg;
    content: '';
    position: absolute;
    inset: -2px;
    z-index: -1;
    border-radius: 0.5rem;
    background: linear-gradient(var(--angle), #50019e, #9c2de1, #bf0377, #f51161);
    animation: neon-border 6s infinite;
}


</style>