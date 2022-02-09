// middleware for JWT user vaerification
const validatePassword = (password) => {
	if (!password) return false
	if (password.length === 0) return false
	if (password.length < 8) return false
	if (password.match(/^[A-Za-z0-9]*$/)) return true
	if (password.match(/^[0-9]*$/)) return true

	return true
}

module.exports = { validatePassword }
