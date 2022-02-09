import axios from "axios"

export const getDocuments = async () => {
	// if (!term) return "Enter a topic to search..."
	try {
		const res = await axios.post("/", { topic: "react" })
		// console.log(res)
	} catch (e) {
		console.error(`Search Error: ${e}`)
		return "Something went wrong while getting results.."
	}
}
