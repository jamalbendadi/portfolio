<template>
    <div class="slider md:h-24 h-12 m-auto overflow-hidden relative w-full" v-if="srcs.length">
        <div class="slide-track" :style="`--img-count: ${srcs.length}; --img-w: ${imgWidth}px`">
            <div class="slide bg-primary-100" v-for="(src, index) in srcs" :key="index">
                <img :src="src" :height="`${100 / (isMediumScreen ? 1 : 2)}`" :width="imgWidth" alt="" />
            </div>
            <div class="slide bg-primary-100" v-for="(src, index) in srcs" :key="index">
                <img :src="src" :height="`${100 / (isMediumScreen ? 1 : 2)}`" :width="imgWidth" alt="" />
            </div>
        </div>
    </div>
</template>
<script setup>
const isMediumScreen = useMediaQuery('(min-width: 768px)');
const props = defineProps({
    srcs: {
        type: Array,
        default: () => []
    }
})
const srcs = toRef(props, 'srcs', [])
// get all src links from the template and put them in an array
const imgWidth = computed(() => 250 / (isMediumScreen.value ? 1 : 2))
</script>
<style scoped>

@keyframes scroll {
	0% { transform: translateX(0); }
	100% { transform: translateX(calc(var(--img-width) * -1 * var(--max-img)))}
}

.slider {	
	&::before,
	&::after {
        background: linear-gradient(to right,  rgb(8, 6, 6) 0%,rgba(255,255,255,0) 100%);
		content: "";
		height: 100px;
		position: absolute;
		width: 200px;
		z-index: 2;
		top: 0;
	}
	
	&::after {
		right: 0;
		transform: rotateZ(180deg);
	}

	&::before {
		left: 0;
	}
	
	.slide-track {
        --img-width: var(--img-w, 250);
        --max-img: var(--img-count, 7);
		animation: scroll 20s linear infinite;
		display: flex;
		width: calc(var(--img-width) * calc(var(--max-img) * 2));
	}
}

</style>
