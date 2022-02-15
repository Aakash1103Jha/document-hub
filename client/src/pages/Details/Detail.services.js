export const getDocumentData = async (docId) => {
	if (!docId) return alert("No document ID found...")
	try {
		const res = await fetch(`/docs/view?_id=${docId}`)
		const data = await res.json()
		return data
	} catch (e) {
		console.error(e)
	}
}
