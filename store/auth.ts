import { defineStore } from 'pinia'
import { readMe, type AuthenticationData } from '@directus/sdk'
import { type DirectusClient, type ClientOptions } from '@directus/sdk';
interface AuthState {
  loggedIn: boolean
  user: object
}

export const useAuth = defineStore('auth', {
  state: (): AuthState => ({
    loggedIn: false,
    user: {},
  }),

  getters: {
    isLoggedIn: (state) => state.loggedIn,
    userData: (state) => state.user,
  },

  actions: {
    async login({email, password, redirect}: {email: string, password: string, redirect: string}) {
      const router = useRouter()
      const { $directus, $readMe } = useNuxtApp()

      try {
        // Try to login
        const response = await $directus.login(email,password)

        // If login was successful, fetch the users data
        const user = await $directus.request(
          $readMe({
            fields: ['*'],
          })
        );

        // Update the auth store with the user data
        this.loggedIn = true
        this.user = user

        // If there's a redirect, send the user there
        if (redirect) {
          router.push(redirect)
        }
      } catch (e) {
        console.log(e)
        throw new Error('Wrong email address or password')
      }
    },
    async logout() {
      const router = useRouter()
      const { $directus } = useNuxtApp()
      try {
        // Try to logout
        const response = await $directus.logout()

        // Remove the auth_expires_at cookie that is left over from the logout
        const cookie = useCookie('directus_auth')
        const auth: AuthenticationData = JSON.parse(cookie.value || '{}')
        if(!!Object.keys(auth).length) {
          auth.expires_at = null
          cookie.value = JSON.stringify(auth)
        }

        // If logout was successful, reset the auth store
        this.$reset()

        // Send the user back to the home page
        router.push('/')
      } catch (e) {
        console.log(e)
        throw new Error('Issue logging out')
      }
    },
    async getUser(directus: any | null = null) {
      const { $directus } = directus === null ? useNuxtApp() : { $directus: directus }
      try {
        // Try to fetch the user data
        const user = await $directus.request(
          readMe({
            fields: ['*'],
          })
        );
        // Update the auth store with the user data
        this.loggedIn = true
        this.user = user
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    async resetState() {
      this.$reset()
    },
  },
})
