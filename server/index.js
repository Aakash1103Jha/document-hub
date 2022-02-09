require("regenerator-runtime")
require("dotenv")

const express = require("express")
const cors = require("cors")
const path = require("path")

const { startServer } = require("./helpers/connection")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// for local deployment
app.use(express.static(path.resolve(__dirname, "..", "client", "build")))
// for production deployment
// app.use(express.static(path.resolve(__dirname, "..", "dist", "build")))

app.get("/api", (req, res) => {
	res.json("🚀")
})
app.get("*", (req, res) => {
	// for local deployment
	res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
	// for production deployment
	// res.sendFile(path.resolve(__dirname, "..", "dist", "build", "index.html"))
})

startServer(app)
