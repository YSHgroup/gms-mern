import multer from 'multer'

const storageOfImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
})

const storageOfApplication = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/applications/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + '.' + file.originalname.split('.').pop())
  }
})

export const upload = multer({
  storage: storageOfImage
})

export const uploadApplication = multer({
  storage: storageOfApplication
})