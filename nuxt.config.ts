export default defineNuxtConfig({
  // https://v3.nuxtjs.org/guide/directory-structure/nuxt.config/

  // As of RC12 Nuxt 3 supports Hybrid rendering mode
  // https://v3.nuxtjs.org/guide/concepts/rendering#route-rules
  //   routeRules: {
  //     '/pages/**': { swr: true },
  //     '/posts/**': { static: true },
  //   },

  css: [],

  modules: [
    '@nuxtjs/tailwindcss',
    // https://pinia.esm.dev
    '@pinia/nuxt',
    // https://vueuse.org/
    '@vueuse/nuxt',
  ],

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
