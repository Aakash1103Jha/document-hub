require("regenerator-runtime")
require("dotenv/config")

const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")

const { startServer } = require("./helpers/connection")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.COOKIE_SECRET))
// for local deployment
// app.use(express.static(path.resolve(__dirname, "..", "client", "build")))
// for production deployment
app.use(express.static(path.resolve(__dirname, "..", "dist", "build")))

app.get("/api", (req, res) => {
	const cookie = req.signedCookies
	console.log({ cookie })
	res.json("🚀")
})
app.get("*", (req, res) => {
	// for local deployment
	// res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
	// for production deployment
	res.sendFile(path.resolve(__dirname, "..", "dist", "build", "index.html"))
})

const UserRoute = require("./routes/User.route")
const DocumentRoute = require("./routes/Document.route")

app.use("/auth/", UserRoute)
app.use("/", DocumentRoute)

startServer(app)
