import axios from "axios"

export const activeUserAccount = async (token) => {
	console.log(token)
	if (!token) return "Token not found"
	try {
		const res = await axios.post(`/auth/activate?token=${token}`)
		const data = { message: res.data, status: res.status }
		return data
	} catch (err) {
		console.error(err.response?.data)
		return alert(err.response?.data)
	}
}
