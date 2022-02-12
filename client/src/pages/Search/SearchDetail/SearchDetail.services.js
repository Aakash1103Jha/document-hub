import axios from "axios"

export const getDocumentData = async (docId) => {
	if (!docId) return alert("No document ID found...")
	try {
		const res = await axios.get(`/docs/view?_id=62064381c14fbb56f5612ac0`)
		return res.data
		// if (status === 500) return alert('Something went ')
	} catch (e) {
		// console.error(e.response)
		if (e.response?.data) return alert(e.response.data)
	}
}
