const { connect } = require("mongoose")
const PORT = process.env.PORT || 4000

const startServer = (app) => {
	try {
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
	} catch (e) {
		return console.error(`Server error: ${e}`)
	}
}
const connectToDb = () => {
	try {
		connect(process.env.URI, () => console.log(`MongoDB Atlas connected successfully!`))
	} catch (e) {
		return console.error(`MongoDB connection error: ${e}`)
	}
}

module.exports = { startServer, connectToDb }
