export default function useAsyncLoader() {

  const performAsync = async (loadingRef: Ref<boolean>, promise: Promise<any>) => {
    loadingRef.value = true
    const result = await promise
    loadingRef.value = false
    return result
  }

  /**
   * Wraps a promise in a try/catch block and returns null if an error is thrown instead of throwing the error.
   * @param promise 
   * @param loadingRef 
   * @returns Ref<T | null>
   */
  const softFetch = async <T>(promise: Promise<T>, loadingRef: Ref<boolean> | null = null) => {
    try {
      if (loadingRef) loadingRef.value = true
      const result = await promise
      if (loadingRef) loadingRef.value = false
      return result
    }
    catch (e) {
      console.error("API ERROR")
      console.error(e)
      if (loadingRef) loadingRef.value = false
      return null
    }
  }
  
  return {
    performAsync,
    softFetch,
  }
}