const User = require("../models/User")
const { compare, genSalt } = require("bcrypt")
const { sign } = require("jsonwebtoken")

const onLogin = async (req, res) => {
	// if (!req.body) return res.status(500).json("Invalid input")
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email: email })
		if (!user) return res.status(404).json("User not found")
		const validPassword = await compare(password, user.password)
		if (!validPassword) res.status(403).json("Invalid password")
		const token = sign({ _id: user._id }, process.env.TOKEN_SECRET, {
			expiresIn: "1d",
			noTimestamp: false,
		})
		res.status(200)
			.cookie("token", token, {
				httpOnly: true,
				signed: true,
				expires: new Date(Date.now() + 86400),
			})
			.json("Logged In")
	} catch (err) {
		return res.status(500).json({ Error: err.message })
	}
}
const onRegister = async (req, res) => {}

module.exports = { onLogin, onRegister }
