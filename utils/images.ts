const isLoaded = async (urls: Array<string>) : Promise<boolean[]> => {
    const images = urls.map(src => {
		const img = new Image()
		img.src = src
		return img
	})
	return await Promise.all(images.map(img => new Promise(resolve => img.onload = resolve)))
		.then(() => Array.from({ length: urls.length }, () => true))
}
export { isLoaded }