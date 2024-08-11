const dbPool = require("../config/config");

const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM users";
  return dbPool.execute(SQLQuery);
};

const getUserByID = (id) => {
  const SQLQuery = `SELECT * FROM users WHERE id=${id}`;
  return dbPool.execute(SQLQuery);
};

const loginUser = (data) => {
  const SQLQuery = `SELECT * FROM users WHERE email='${data.email}'`;
  return dbPool.execute(SQLQuery);
};

const postAddUser = (data) => {
  const SQLQuery = `INSERT INTO users (nama, email, no_telepon, password, role) VALUES ('${data.nama}', '${data.email}', '${data.no_telepon}', '${data.password}', '${data.role}')`;
  return dbPool.execute(SQLQuery);
};

const patchUserData = (iduser, data) => {
  const SQLQuery = `UPDATE users
  SET nama = '${data.nama}',
      email = '${data.email}',
      no_telepon = '${data.no_telepon}',
      password = '${data.password}',
      role = '${data.role}'
  WHERE id = ${iduser};`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllUsers,
  getUserByID,
  loginUser,
  postAddUser,
  patchUserData,
};
