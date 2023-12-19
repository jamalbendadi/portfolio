export default function useFiles() {
  const { $config } = useNuxtApp()

  function fileUrl(fileId: string) {
    const directusUrl = process.client ? $config.public.directusUrlClient : $config.public.directusUrlServer
    return `${directusUrl}/assets/${fileId}`
  }

  return {
    fileUrl,
  }
}
