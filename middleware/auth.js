import { useAuth } from '~/store/auth'
const msg =
  'You must be logged in to view this page. Redirecting back to home page.'

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuth()
  console.log('client', process.client)
  if (!user.isLoggedIn) {
    if (process.client) {
      window.alert(msg)
    }
    console.log(msg)

    return navigateTo('/')
  }
})
