export default defineNuxtConfig({
  // https://v3.nuxtjs.org/guide/directory-structure/nuxt.config/

  // As of RC12 Nuxt 3 supports Hybrid rendering mode
  // https://v3.nuxtjs.org/guide/concepts/rendering#route-rules
  //   routeRules: {
  //     '/pages/**': { swr: true },
  //     '/posts/**': { static: true },
  //   },

  modules: [// https://pinia.esm.dev
  '@nuxtjs/tailwindcss', // https://vueuse.org/
  '@pinia/nuxt', '@vueuse/nuxt', 'nuxt-security'],
  

  css: [],
  security: {
    tokensPerInterval: 15,
    interval: 60000,
    headers: true,
    throwError: true,
  },
  runtimeConfig: {
    public: {
      directusUrlClient: process.env.DIRECTUS_URL_CLIENT,
      directusUrlServer: process.env.DIRECTUS_URL_SERVER
    },
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})