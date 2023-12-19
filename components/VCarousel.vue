<template>
    <div style="height: 340px" class="relative w-full overflow-hidden bg-slate-400 rounded-lg" @touchstart="handleTouchStart"
        @touchmove="handleTouchMove" @touchend="handleTouchEnd">
        <div class="flex transition-transform duration-300 " :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            <div class="flex-none w-full p-3 self-center" v-for="(image, index) in images" :key="index">
                <img style="max-height: 320px" :src="image" :alt="'Image ' + index"
                    class="block m-auto rounded-lg shadow-lg border-[5px] border-white dark:border-slate-900">
            </div>
        </div>

        <ArrowLeftCircleIcon v-if="images.length > 1"
            class="absolute h-12 w-12 top-1/2 left-0 transform -translate-y-1/2 text-slate-700 p-2 rounded-full"
            @click="prev" />
        <ArrowRightCircleIcon v-if="images.length > 1"
            class="absolute h-12 w-12 top-1/2 right-0 transform -translate-y-1/2 text-slate-700 p-2 rounded-full"
            @click="next" />
    </div>
</template>
  
<script setup>
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue';

const props = defineProps({
    images: {
        type: Array,
        required: true,
    },
});

const images = toRef(props, 'images');
const currentIndex = ref(0);
const [touchStartX, touchEndX] = [ref(0), ref(0)];

const next = () => currentIndex.value = (currentIndex.value + 1) % images.value.length;
const prev = () => currentIndex.value = currentIndex.value - 1 < 0 ? images.value.length - 1 : currentIndex.value - 1;

const handleTouchStart = (e) => touchStartX.value = e.touches[0].clientX;
const handleTouchMove = (e) => touchEndX.value = e.touches[0].clientX;


const handleTouchEnd = () => {
    if (touchStartX.value - touchEndX.value > 50) next();
    else if (touchEndX.value - touchStartX.value > 50) prev();
};

let autoScrollInterval;
onMounted(() => autoScrollInterval = setInterval(next, 15000));
onUnmounted(() => clearInterval(autoScrollInterval));
</script>
  
<style scoped>
.gradient {
    @apply bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500;
    padding: 2px;
}
</style>
