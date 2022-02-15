const { createTransport } = require("nodemailer")

const mailerService = async (token, email) => {
	const transporter = createTransport({
		// service: "gmail",
		// auth: {
		// 	user: process.env.EMAIL_ID,
		// 	pass: process.env.EMAIL_PASS,
		// },
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		secure: true,
		auth: {
			user: process.env.EMAIL_ID,
			pass: process.env.EMAIL_PASS,
		},
		tls: {
			// do not fail on invalid certs
			rejectUnauthorized: process.env.EMAIL_REJECT,
		},
	})
	const mailOptions = {
		from: `noreply <${process.env.EMAIL_ID}>`, // sender address
		to: `${email}`, // list of receivers
		subject: "Nodemailer service activation", // Subject line
		html: `
		<p><a href='https://dochub-app.herokuapp.com/auth/activate?token=${token}'>Click here</a> to activate your account. This link will expire in 1 hour.</p>
		
		`,
	}
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.error(err)
			return "Failed to send activation email"
		}
		console.info(info)
		return "Please check your inbox (or even spam/trash) for mail with activation link"
	})
}

module.exports = mailerService
