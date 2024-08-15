const multer = require('multer');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
	// Tempat penyimpanan file
	destination: function (req, file, cb) {
		cb(null, 'public/images')
	},
	// Nama file yang disimpan
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname)
	},
	// Limt ukuran file
	
})

// Fungsi upload file
const upload = multer({ 
	storage: storage,
	limits: {
		fileSize: 2 * 1024 * 1024 // 2 MB
	},
	fileFilter: function (req, file, cb) {
		if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
			return cb(new Error('File type is not supported'))
		}
		cb(null, true)
	}
});

module.exports = {
	upload
};
