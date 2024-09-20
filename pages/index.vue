<template>
    <div class="pb-24">
        <div class="pt-12">
        <Landing :imgUrl="imgUrl" :socials="data?.socials ?? []" :srcs="srcs" />
        </div>
        <div class="px-6 space-y-8">
            <PortfolioComponent />
        </div>
    </div>
    <div class="fixed bottom-4 right-10 z-50">
        <MessageMeComponent></MessageMeComponent>
    </div>
</template>
<script setup lang="ts">
import useAsyncLoader from '~/composables/useAsyncLoader'
import { readItems } from '@directus/sdk';
const { $directus } = useNuxtApp()
const { fileUrl } = useFiles()
const asyncLoader = useAsyncLoader() 

const { pending, data } = await useLazyAsyncData('images', async () => {
    const [landing_img, socials, skillItems] = await Promise.all([
        asyncLoader.softFetch(
            $directus.request(readItems('images', { filter: { name: { _eq: 'landing_page_image' } } }))
        ),
        asyncLoader.softFetch(
            $directus.request(readItems('socials'))
        ) ?? [],
        asyncLoader.softFetch(
            $directus.request(readItems('skills'))
        )
    ])
    return { landing_img, socials, skillItems }
})

const srcs = data.value?.skillItems?.filter((skill: any) => skill.logo)
    .map((skill: any) => fileUrl(skill.logo)) ?? []
const imgUrl = data.value?.landing_img ? ref(fileUrl(data.value.landing_img[0].image)) : ref('')
</script>