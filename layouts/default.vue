<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
<script/>
<template>
  <SpeedInsights></SpeedInsights>
  <div class="bg-black">
    <!--<MainHeader title="Jamal Bendadi, Software Engineer and AI enthusiast" />-->
    <slot />
    <!--<MainFooter title="Jamal Bendadi" />-->
  </div>
</template>
