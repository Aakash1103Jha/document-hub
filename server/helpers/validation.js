const { verify } = require("jsonwebtoken")

const validatePassword = (password) => {
	if (!password || password.length <= 0) return false
	if (
		password.match(
			/^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*["!'^+%&/()=?_\-*\\{}[\]$#£é€@])(?=.{8,}))/gm,
		)
	)
		return true
	return false
}
// middleware for JWT user verification
const validateToken = async (req, res, next) => {
	if (!req.signedCookies.token) return res.status(403).json("Access denied ⛔️")
	const token = req.signedCookies.token
	try {
		const validUser = verify(token, process.env.TOKEN_SECRET, { complete: true })
		if (!validUser) return res.status(403).json("Unauthorized user ⛔️")
		req.user = validUser
		next()
	} catch (error) {
		console.error(error)
		res.status(500).json("Something went wrong")
	}
}
// middleware for JWT user activation
const validateActivationToken = async (req, res, next) => {
	if (!req.query.token) return res.status(403).json("Token not found, or has expired ⛔️")
	const token = req.query.token
	try {
		const user = verify(token, process.env.ACTIVATION_TOKEN_SECRET, { complete: true })
		if (!user) return res.status(403).json("Token invalid or expired. Register again. ⛔️")
		req.user = user
		next()
	} catch (error) {
		console.error(error)
		res.status(500).json("Something went wrong")
	}
}

module.exports = { validatePassword, validateToken, validateActivationToken }
