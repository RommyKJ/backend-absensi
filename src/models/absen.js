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

module.exports = {
  postAbsensiUser,
  getAllAbsensi,
};
