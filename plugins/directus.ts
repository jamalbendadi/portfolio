import { createDirectus, authentication, rest, readItem, readItems, readMe, type AuthenticationData } from '@directus/sdk'

// Make sure you review the Directus SDK documentation for more information
// https://docs.directus.io/reference/sdk.html

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const directusUrl = process.client ? config.public.directusUrlClient : config.public.directusUrlServer

  const cookie = useCookie('directus_auth')
  const directus = createDirectus(directusUrl)
    .with(authentication('cookie', {
      autoRefresh: true,
      storage: {
        // cookie storage
        get: () => {
          try {
            if(!cookie.value) return null
            const auth = typeof cookie.value === 'string' ? JSON.parse(cookie.value) : cookie.value
            return auth
          }
          catch (e) {
            console.log('Error parsing cookie', e)
            console.log()
          }
          return null
        },
        set: (value: AuthenticationData | null) => {
          cookie.value = JSON.stringify(value)
        },
      },
      credentials: 'include'
    }))
    .with(rest({ credentials: 'include' }))

  return {
    provide: { directus, readItem, readItems, readMe },
  }
})
