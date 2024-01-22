<template>
	<div class="slider h-12 m-auto overflow-hidden relative w-full md:w-[48rem] my-24 animate-fade-in" v-if="srcs.length">
		<div class="slide-track bg-primary-100" :style="`--img-count: ${srcs.length}; --img-w: ${IMG_WIDTH}px`">
			<div class="slide" v-for="(src, index) in srcs" :key="index">
				<img :src="src" height="50" :width="IMG_WIDTH" alt="" class="animate-fade-in"
					v-if="src" v-show="loaded[index]" />
			</div>
			<div class="slide" v-for="(src, index) in srcs" :key="index" v-if="loaded[loaded.length-1]">
				<img :src="src" height="50" :width="IMG_WIDTH" alt=""/>
			</div>
		</div>
	</div>
</template>
<script setup>
import { isLoaded } from '~/utils/images';
const IMG_WIDTH = 125
const props = defineProps({
	srcs: {
		type: Array,
		default: () => []
	}
})
const srcs = toRef(props, 'srcs', [])
const loaded = ref(Array.from({ length: srcs.value.length }, () => false), true) // array of srcs.length false values to track if images are loaded

// check if images are cached
onMounted(async () => {
	loaded.value = await isLoaded(srcs.value)
})
</script>
<style scoped>
.slider {
	&::before,
	&::after {
		background: linear-gradient(to right, rgb(8, 6, 6) 0%, rgba(255, 255, 255, 0) 100%);
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
		animation: scroll 10s linear infinite;
		display: flex;
		width: calc(var(--img-width) * calc(var(--max-img) * 2));
	}
}
@keyframes scroll {
	0% {
		transform: translateX(0);
	}

	100% {
		transform: translateX(calc(var(--img-width) * -1 * var(--max-img)))
	}
}

</style>
