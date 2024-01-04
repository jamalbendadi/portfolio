<template>
    <div class="min-h-screen flex flex-col">
        <div class="grid grid-cols-5 h-[80%]">
            <div class="text-white mx-auto col-span-2 flex flex-col justify-center">
                <div class="flex flex-col">
                    <div class="my-auto">
                        <h1 class="text-8xl font-extrabold">Jamal</h1>
                        <h1 class="text-8xl font-extrabold">Bendadi</h1>
                        <h1 class="text-2xl font-bold"><i>AI and Software engineer</i></h1>
                        <Socials :socials="socials" v-if="socials.length > 0" />
                    </div>
                </div>
            </div>
            <div ref="imageRef" class="col-span-3 flex flex-shrink" @pointermove="rotateEffect">
                <img style="--posXx: 1; --posYy: 1;" :src="imgUrl" class="object-contain" v-if="imgUrl" />
            </div>
        </div>
        <div class="flex-grow flex flex-col justify-center">
            <LogoSlider :srcs="srcs" />
        </div>
    </div>
</template>
<script setup lang="ts">
import Socials from '~/components/Socials.vue'
const props = defineProps({
    imgUrl: String,
    socials: Array,
    srcs: Array
})

const imgUrl = toRef(props, 'imgUrl')
const socials = toRef(props, 'socials', [])
const srcs = toRef(props, 'srcs', [])
const imageRef: Ref<HTMLElement | null> = ref(null)
const dimensions = { left: 1, top: 1, width: 1, height: 1 }

onMounted(() => {
    const el = imageRef.value as HTMLElement
    const { left, top, width, height } = el?.getBoundingClientRect() as DOMRect
    dimensions.left = left, dimensions.top = top;
    dimensions.width = width, dimensions.height = height;
    console.log(dimensions)
})
const rotateEffect = (e: PointerEvent) => {
    const el = imageRef.value as HTMLElement
    if (!el) return
    // get position of mouse relative to the element
    const { clientX: x, clientY: y } = e
    const posX = ((x - dimensions.left - dimensions.width / 2) / (dimensions.width / 2)) * -1
    const posY = (y - dimensions.top - dimensions.height / 2) / (dimensions.height / 2)
    const img = el.querySelector('img') as HTMLElement
    img.style.setProperty('--posXx', `${posX}`)
    img.style.setProperty('--posYy', `${posY}`)
}
</script>
<style scoped>
img {
    --xx: calc(var(--posXx, 0));
    --yy: calc(var(--posYy, 0));
    --i: var(--deg, 2);
    transition: .3s;
    transform: perspective(500px) rotate3d(var(--yy), var(--xx), 0, calc(var(--i, 1) * -8deg));
}
</style>
