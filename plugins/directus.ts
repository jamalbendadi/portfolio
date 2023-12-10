import { createDirectus, authentication, rest, readItem, readItems, readMe, type AuthenticationData } from '@directus/sdk'
import { c } from '@directus/sdk/dist/index-7ec1f729'
import { useAuth } from '~~/store/auth'
// Make sure you review the Directus SDK documentation for more information
// https://docs.directus.io/reference/sdk.html

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  const directusUrl = config.public.directusUrl

  // Create a new storage class to use with the SDK
  // Needed for the SSR to play nice with the SDK
  /*class CookieStorage extends BaseStorage {
    deletedKeys = new Set<string>()
    get(key: string) {
      if (this.deletedKeys.has(key)) return null
      const cookie = useCookie(key)
      return cookie.value
    }
    set(key: string, value: string) {
      this.deletedKeys.delete(key)
      const cookie = useCookie(key)
      return (cookie.value = value)
    }
    delete(key: string) {
      this.deletedKeys.add(key)
      const cookie = useCookie(key)
      return (cookie.value = null)
    }
  }*/

  // Create a new instance of the SDK
  /*const directus = new Directus(directusUrl, {
    storage: new CookieStorage(),
    auth: {
      mode: 'json',
    },
  })*/
  const cookie = useCookie('directus_auth')
  const directus = createDirectus(directusUrl)
    .with(authentication('cookie', {
      //autoRefresh: true,
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
    }))
    .with(rest())

  return {
    provide: { directus, readItem, readItems, readMe },
  }
})
