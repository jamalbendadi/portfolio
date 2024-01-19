<template>
    <div class="pb-24">
        <div class="pt-12">
            <Landing :imgUrl="imgUrl" :socials="socials" :srcs="srcs" />
        </div>
        <div class="px-6 space-y-8">
            <PortfolioComponent />
        </div>
    </div>
</template>
<script setup lang="ts">
import PortfolioComponent from '~/components/PortfolioComponent.vue'
import useAsyncLoader from '~/composables/useAsyncLoader'
import { readItems } from '@directus/sdk';
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()
const asyncLoader = useAsyncLoader()

const landing_img = await asyncLoader.performAsyncWithResultOrNull(
    $directus.request(
        readItems('images', { filter: { name: { _eq: 'landing_page_image' } } })
    )
)
const socials = await asyncLoader.performAsyncWithResultOrNull(
    $directus.request(readItems('socials'))
) ?? [];
const skillItems = await asyncLoader.performAsyncWithResultOrNull(
    $directus.request(readItems('skills'))
);
const srcs = skillItems?.filter((skill: any) => skill.logo)
    .map((skill: any) => fileUrl(skill.logo)) ?? []
const imgUrl = landing_img ? ref(fileUrl(landing_img[0].image)) : ref('')
</script>