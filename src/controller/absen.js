const absenModel = require("../models/absen");
const multer = require("multer");
const path = require("path");

// Setup Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}_${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!"); // Filter out non-image files
    }
  },
}).single("img_wfh");

const postAbsensiUser = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({
        message: "File upload error",
        error: err,
      });
    }
    try {
      const { body, file } = req;

      // Buat objek data yang akan dimasukkan ke database
      const dataToInsert = {
        ...body,
        img_wfh: file ? file.path : null, // Path gambar jika ada, null jika tidak ada gambar
      };

      const [data] = await absenModel.postAbsensiUser(dataToInsert);
      res.status(201).json({
        message: "POST absensi masuk karyawan berhasil",
        data: {
          idAbsen: data.insertId,
          ...dataToInsert,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: "Server Error",
        serverMessage: err,
      });
    }
  });
};

const getAllAbsensi = async (req, res) => {
  try {
    const [data] = await absenModel.getAllAbsensi();
    res.json({
      message: "GET absensi success",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: err,
    });
  }
};

module.exports = { postAbsensiUser, getAllAbsensi };
