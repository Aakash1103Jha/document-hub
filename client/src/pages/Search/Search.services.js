export const getSearchData = async (term) => {
	if (!term) return "Enter a topic to search..."
	try {
		const res = await fetch(`/docs/search?topic=${term}`)
		const data = await res.json()
		if (typeof data === "string") {
			alert(data)
		} else {
			return data
		}
	} catch (e) {
		console.error(e)
	}
}
