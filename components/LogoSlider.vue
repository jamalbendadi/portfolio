<template>
    <div class="slider h-24 m-auto overflow-hidden relative max-w-4xl rounded-xl" v-if="srcs.length">
        <div class="slide-track" :style="`--img-count: ${srcs.length}`">
            <div class="slide bg-primary-100" v-for="(src, index) in srcs" :key="index">
                <img :src="src" height="100" width="250" alt="" />
            </div>
            <div class="slide bg-primary-100" v-for="(src, index) in srcs" :key="index">
                <img :src="src" height="100" width="250" alt="" />
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    srcs: {
        type: Array,
        default: () => []
    }
})
const srcs = toRef(props, 'srcs', [])
// get all src links from the template and put them in an array

</script>
<style scoped>

@keyframes scroll {
	0% { transform: translateX(0); }
	100% { transform: translateX(calc(var(--img-width) * -1 * var(--max-img)))}
}

.slider {	
	&::before,
	&::after {
        background: linear-gradient(to right,  rgba(255,255,255,1) 0%,rgba(255,255,255,0) 100%);
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
        --img-width: 250px;
        --max-img: 7;
		animation: scroll 20s linear infinite;
		display: flex;
		width: calc(var(--img-width) * calc(var(--max-img) * 2));
	}
}
</style>
