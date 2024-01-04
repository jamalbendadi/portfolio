<template>
    <div class="flex mt-4">
        <VButton v-for="(social, index) in socials" :key="social.name" :href="social.link" :class="[{ 
            'rounded-l-2xl': index == 0, 
            'rounded-r-2xl': index == socials.length - 1 }]">
            <div v-html="social.svg"></div>    
        </VButton>
    </div>
</template>
<script setup>
const props = defineProps({
    socials: {
        type: Array,
        default: () => []
    }
})
const socials = toRef(props, 'socials', [])
</script>