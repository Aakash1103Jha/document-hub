import axios from "axios"

export const getSearchData = async (term) => {
	if (!term) return "Enter a topic to search..."
	try {
		const res = await axios.get(`/docs/search?topic=${term}`)
		if (typeof res.data === "string") {
			alert(res.data)
		} else {
			return res.data
		}
	} catch (e) {
		console.error(e.response.data)
		return e.response?.data && alert(e.response?.data)
	}
}
