<template>
    <swiper :style="`height: ${MAX_HEIGHT+1}rem; width: ${WIDTH}rem`" 
    :effect="'cards'" :grabCursor="true" :modules="modules" :autoplay="{delay: 5000, disableOnInteraction: true}">
        <swiper-slide v-for="(image, index) in images" :key="index" :style="{ backgroundColor: colors[(index + Math.floor(Math.random(colors.length))) % colors.length] }">
            <img :style="`max-height: ${MAX_HEIGHT}rem;`" :src="image.url" :alt="image.alt" class="object-cove rounded-lg shadow-lg" />
        </swiper-slide>
    </swiper>
</template>
<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Pagination, Autoplay } from 'swiper/modules';

const props = defineProps({
    images: {
        type: Array,
        default: () => []
    }
})
const MAX_HEIGHT = 26
const WIDTH = 40
const images = ref(props.images)
const modules = ref([EffectCards,Pagination, Autoplay])
const colors = [
    'rgb(69, 7, 93)',
    'rgb(6, 46, 78)',
    'rgb(8, 68, 30)',
    'rgb(211, 122, 7)',
    'rgb(118, 163, 12)',
    'rgb(180, 10, 47)',
    'rgb(35, 99, 19)',
    'rgb(0, 68, 255)',
    'rgb(218, 12, 218)',
    'rgb(54, 94, 77)'
]
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
</style>