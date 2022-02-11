const multer = require("multer")
const { mkdirSync } = require("fs")
const mimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"]

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const path = "./temp"
		mkdirSync(path, { recursive: true })
		cb(null, path)
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname)
	},
})
const filter = (req, file, cb) => {
	const size = Number(req.headers["content-length"])
	if (size < 3000000 && mimeTypes.includes(file.mimetype)) {
		return cb(null, true)
	} else {
		err = "File greater than 3 MB for format not allowed!"
		cb(null, false)
		return (req.error = err)
	}
}

const uploadHandler = multer({
	storage: storage,
	fileFilter: filter,
	limits: { fileSize: 3000000 },
})

module.exports = { uploadHandler }
