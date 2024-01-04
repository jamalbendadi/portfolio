<template>
    <div class="relative pb-24">
        <div class="pt-12">
            <Landing :imgUrl="imgUrl" :socials="socials" :srcs="srcs"/>
        </div>
        <div class="max-w-6xl px-6 mx-auto space-y-8">
            <h1 class="section-title ml-14">Works</h1>
            <PortfolioComponent />
        </div>
    </div>
</template>
<script setup lang="ts">
import PortfolioComponent from '~/components/PortfolioComponent.vue'
import { readItems } from '@directus/sdk';
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()
const landing_img = await $directus.request(readItems('images', {
    filter: { name: { _eq: 'landing_page_image' } }
}))
const socials = await $directus.request(readItems('socials'))
let srcs = (await $directus.request(readItems('skills')))
    .filter((skill: any) => skill.logo)
    .map((skill: any) => skill.logo ? fileUrl(skill.logo) : null)
const imgUrl = ref(fileUrl(landing_img[0].image))
</script>