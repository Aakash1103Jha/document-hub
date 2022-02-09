import axios from "axios"

export const getSearchData = async (term) => {
	if (!term) return "Enter a topic to search..."
	try {
		const res = await axios.get("/api")
		console.log(res)
	} catch (e) {
		console.error(`Search Error: ${e}`)
		return "Something went wrong while getting results.."
	}
}
