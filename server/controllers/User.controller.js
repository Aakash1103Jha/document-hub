const User = require("../models/User")
const { compare, genSalt, hash } = require("bcrypt")
const { sign } = require("jsonwebtoken")
const { validatePassword } = require("../helpers/validation")
const mailerService = require("../helpers/nodemailer.config")

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
	if (!req.body.username || !req.body.email || !req.body.password)
		return res.status(401).json("Looks like you forgot to fill in a mandatory field")
	const { password, email } = req.body
	try {
		const user = await User.findOne({ email: email })
		if (user) return res.status(401).json("Email already in use")
		if (validatePassword(password) === false)
			return res
				.status(401)
				.json(
					"Password must contain at least 1 uppercase letter, number and special character.",
				)
		const activationToken = sign({ ...req.body }, process.env.ACTIVATION_TOKEN_SECRET, {
			expiresIn: "1d",
			noTimestamp: false,
		})
		await mailerService(activationToken, email).then((mail) => {
			console.log(mail)
			res.send(mail)
		})
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
		const userData = await User.findById({ _id })
		res.send(userData)
	} catch (err) {
		return res.status(500).json({ Error: err.message })
	}
}
const onActivateAccount = async (req, res) => {
	console.log(req.error)
	if (!req.user) return res.status(401).json("Unauthorized user ⛔️")
	const { username, email, password } = req.user.payload
	const user = await User.findOne({ email: email })
	if (user) return res.redirect("/")

	const hashPassword = await hash(password, await genSalt(10))
	try {
		const newUser = new User({ username, email, password: hashPassword })
		await newUser.save()
		return res.redirect("/login")
	} catch (err) {
		return res.status(500).json({ Error: err.message })
	}
	// validate user jwt token using middleware
	// if invalid or expired token, do not register account
	// if valid token, create new user and save in db
}
module.exports = { onLogin, onRegister, onGetProfile, onResetPassword, onActivateAccount }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFha2FzaDExMDNqaGEiLCJlbWFpbCI6ImFha2FzaC5qaGExMTAzQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiQWFrYXNoamhhQDExMDMiLCJpYXQiOjE2NDQ3NzI2MDQsImV4cCI6MTY0NDg1OTAwNH0.3-hfV7rUUyDHxNEo4OTTbA303ecCfaNaJ3wUI5uEQmk
// http://localhost:4000/activate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRoZWRldmRlc2lnbmVyIiwiZW1haWwiOiJ0aGVkZXZkZXNpZ25lckBnbWFpbC5jb20iLCJwYXNzd29yZCI6IkFha2FzaGpoYUAxMTAzIiwiaWF0IjoxNjQ0ODU2MTg0LCJleHAiOjE2NDQ5NDI1ODR9.HG2r4cvf6ykFtVcILDMlW0U4i6eaEfedoeNXHgsELf8
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFha2FzaCIsImVtYWlsIjoiYWFrYXNoLmpoYTExMDNAZ21haWwuY29tIiwicGFzc3dvcmQiOiJBYWthc2hqaGFAMTEwMyIsImlhdCI6MTY0NDg1ODgwMCwiZXhwIjoxNjQ0OTQ1MjAwfQ.IIrqtfJf5pmmD62L_CD6VugSdaBelN63VapLErbHmlU
