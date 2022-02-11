const User = require("../models/User")
const { compare, genSalt, hash } = require("bcrypt")
const { sign } = require("jsonwebtoken")
const { validatePassword } = require("../helpers/validation")

const onLogin = async (req, res) => {
	if (!req.body) return res.status(400).json("Invalid input")
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email: email })
		if (!user) return res.status(401).json("User not found")
		const validPassword = await compare(password, user.password)
		if (!validPassword) return res.status(401).json("Invalid password")
		const token = sign({ _id: user._id, username: user.username }, process.env.TOKEN_SECRET, {
			expiresIn: "1d",
			noTimestamp: false,
		})
		res.status(200)
			.cookie("token", token, {
				httpOnly: true,
				signed: true,
				expires: new Date(Date.now() + 86400000),
			})
			.json("Logged In")
	} catch (err) {
		return res.status(500).json({ Error: err.message })
	}
}
const onRegister = async (req, res) => {
	if (!req.body) return res.status(401).json("Invalid input")
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email: email })
		if (user) return res.status(401).json("Email already in use")
		if (validatePassword(password) === false)
			return res
				.status(401)
				.json(
					"Password must contain at least 1 uppercase letter, number and special character.",
				)
		const hashPassword = await hash(password, await genSalt(10))
		const newUser = new User({ ...req.body, password: hashPassword })
		await newUser.save()
		return res.status(200).json("Successfully registered 🚀")
	} catch (err) {
		return res.status(500).json({ Error: err.message })
	}
}
const onGetProfile = async (req, res) => {
	// TODO: User profile
}

module.exports = { onLogin, onRegister, onGetProfile }
