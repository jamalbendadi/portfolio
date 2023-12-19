export default function useAsyncLoader() {

  const performAsync = async (loadingRef: Ref<boolean>, promise: Promise<any>) => {
    loadingRef.value = true
    const result = await promise
    loadingRef.value = false
    return result
  }

  return {
    performAsync,
  }
}