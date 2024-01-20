<template>
    <div class="flex mt-4">
        <VButton v-for="(social, index) in socials" :key="social.name" :href="social.link">
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