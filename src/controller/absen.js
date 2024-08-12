const absenModel = require("../models/absen");
const multer = require("multer");
const path = require("path");

// Setup Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads"); // Tentukan direktori penyimpanan
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // Tentukan nama file yang unik
  },
});

const upload = multer({ storage: storage }).single("img_wfh");

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

      const dataToInsert = {
        ...body,
        img_wfh: file ? `src/uploads/${file.filename}` : null,
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

const getAbsensiMasuk = async (req, res) => {
  try {
    const { idUser } = req.params;
    const [data] = await absenModel.getAbsensiMasuk(idUser);
    res.status(200).json({
      message: "Get absensi masuk karyawan berhasil",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: err,
    });
  }
};

const patchAbsenKeluar = async (req, res) => {
  try {
    const { body } = req;
    const [data] = await absenModel.patchAbsenKeluar(body);
    res.status(201).json({
      message: "PATCH absensi keluar karyawan berhasil",
      data: {
        idAbsen: data.insertId,
        ...body,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: err,
    });
  }
};

module.exports = {
  postAbsensiUser,
  getAllAbsensi,
  patchAbsenKeluar,
  getAbsensiMasuk,
};
