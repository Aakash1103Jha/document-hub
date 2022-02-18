const User = require("../models/User")
const Profile = require("../models/Profile")

const { compare, genSalt, hash } = require("bcrypt")
const { sign } = require("jsonwebtoken")
const { validatePassword } = require("../helpers/validation")

const onLogin = async (req, res) => {
	if (!req.body) return res.status(400).json("Invalid input")
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email: email })
		if (!user) return res.status(401).json("Invalid email - user not found")
		const validPassword = await compare(password, user.password)
		if (!validPassword) return res.status(401).json("Incorrect password")
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
	if (!req.body) return res.status(401).json("Looks like you forgot to fill in a mandatory field")
	const { password, email, username } = req.body
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
		const newUser = new User({ username, email, password: hashPassword })
		const newProfile = new Profile({ email, _id: newUser._id, username })
		await newUser.save()
		await newProfile.save()
		return res.status(200).json("Success")
	} catch (err) {
		return res.status(500).json({ Error: err.message })
	}
}
const onResetPassword = async (req, res) => {
	if (!req.body.password || !req.body.email) return res.status(401).json("Mandatory data missing")
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email: email })
		if (!user) return res.status(401).json("Invalid email - user not found")
	} catch (err) {
		return res.status(500).json({ Error: err.message })
	}
	const newPassword = await hash(password, await genSalt(10))
	try {
		await User.findOneAndUpdate(
			{ email: email },
			{ $set: { password: newPassword } },
			{ upsert: false },
		)
		return res.status(200).json("Password changed successfully!")
	} catch (err) {
		return res.status(500).json({ Error: err.message })
	}
}
const onGetProfile = async (req, res) => {
	if (!req.user.payload._id) return res.status(401).json("Unauthorized user ⛔️")
	const { _id } = req.user.payload
	try {
		const userProfile = await Profile.findById({ _id })
		res.send(userProfile)
	} catch (err) {
		return res.status(500).json({ Error: err.message })
	}
}

module.exports = { onLogin, onRegister, onGetProfile, onResetPassword }
