export default function useAsyncLoader() {

  const performAsync = async (loadingRef: Ref<boolean>, promise: Promise<any>) => {
    loadingRef.value = true
    const result = await promise
    loadingRef.value = false
    return result
  }

  const performAsyncWithResultOrNull = async <T>(promise: Promise<T>, loadingRef: Ref<boolean> | null = null) => {
    try {
      if (loadingRef) loadingRef.value = true
      const result = await promise
      if (loadingRef) loadingRef.value = false
      return result
    }
    catch (e) {
      console.error(e)
      if (loadingRef) loadingRef.value = false
      return null
    }
  }


  return {
    performAsync,
    performAsyncWithResultOrNull,
  }
}