const express = require("express");

const router = express.Router();
const absenController = require("../controller/absen");
router.post("/", absenController.postAbsensiUser);
router.get("/masuk/:idUser", absenController.getAbsensiMasuk);
router.patch("/update", absenController.patchAbsen);
router.get("/all", absenController.getAllAbsensi);
module.exports = router;
