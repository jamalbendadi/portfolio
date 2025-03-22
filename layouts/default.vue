<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
import { Analytics } from '@vercel/analytics/nuxt'
</script>
<template>
  <SpeedInsights/>
  <Analytics/>
  <div class="bg-black">
    <!--<MainHeader title="Jamal Bendadi, Software Engineer and AI enthusiast" />-->
    <slot />
    <!--<MainFooter title="Jamal Bendadi" />-->
  </div>
</template>
