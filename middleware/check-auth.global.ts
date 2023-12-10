import { useAuth } from '~/store/auth'
const msg =
  'You must be logged in to view this page. Redirecting back to home page.'

export default defineNuxtRouteMiddleware(async (to, from) => {
  //if (!process.client) return
  console.log(process.client)
  const { $directus } = useNuxtApp()
  const auth = useAuth()

  const token = await $directus.getToken()
  const side = process.server ? 'server' : 'client'

  // If there's a token but we don't have a user, fetch the user
  if (!auth.isLoggedIn && token) {
    console.log('Token found, fetching user from ' + side)
    console.log('Token is', token)
    try {
      await auth.getUser()
      console.log('User fetched successfully from ' + side)
    } catch (e) {
      const error = e as Error
      console.log('Failed to fetch user from ' + side, error.message)
    }
  }

  // If the user is logged in but there's no token, reset the auth store {
  if (auth.isLoggedIn && !token) {
    console.log('Token not found, resetting auth store from ' + side)
    auth.$reset()
  }
})
