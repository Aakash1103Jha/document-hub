require("regenerator-runtime")
require("dotenv")

const express = require("express")
const cors = require("cors")
const path = require("path")

const PORT = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.resolve(__dirname, "client/build")))
app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" })
})
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client/build", "index.html"))
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
