import axios from "axios"

export const getSearchData = async (term) => {
	if (!term) return "Enter a topic to search..."
	try {
		const res = await axios.get(`http://localhost:4000/docs/search?topic=${term}`)
		return res.data
	} catch (e) {
		console.error(`Search Error: ${e}`)
		return "Something went wrong while getting results.."
	}
}
