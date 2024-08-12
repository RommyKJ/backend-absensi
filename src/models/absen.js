const dbPool = require("../config/config");

const postAbsensiUser = (data) => {
  const date = new Date();
  const SQLQuery = `INSERT INTO absensi (idUser, absen_masuk, img_wfh, is_wfh) VALUES (${data.idUser}, '${date}', '${data.img_wfh}', '${data.is_wfh}')`;
  return dbPool.execute(SQLQuery);
};

const getAllAbsensi = () => {
  const SQLQuery = ` SELECT a.*, u.*
                    FROM absensi a
                    JOIN users u ON a.idUser = u.id`;
  return dbPool.execute(SQLQuery);
};

//%a = hari, %b = bulan, %d = hari dalam angka, %Y = Tahun dalam angka, %T = time
const getAbsensiMasuk = (idUser) => {
  const SQLQuery = ` SELECT *
    FROM absensi WHERE idUser = ${idUser} AND DATE(STR_TO_DATE(absen_masuk, '%a %b %d %Y %T GMT+0700 (Western Indonesia Time)')) = CURDATE()`;
  return dbPool.execute(SQLQuery);
};

const patchAbsenKeluar = (data) => {
  const date = new Date();
  const SQLQuery = `UPDATE absensi SET absen_keluar='${date}' WHERE idUser = ${data.idUser} AND DATE(STR_TO_DATE(absen_masuk, '%a %b %d %Y %T GMT+0700 (Western Indonesia Time)')) = CURDATE()`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  postAbsensiUser,
  getAllAbsensi,
  patchAbsenKeluar,
  getAbsensiMasuk,
};
