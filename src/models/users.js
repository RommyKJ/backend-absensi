const dbPool = require("../config/config");
const bcrypt = require("bcryptjs");

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

const postAddUser = async (data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const SQLQuery = `INSERT INTO users (nama, email, no_telepon, password, role) VALUES ('${data.nama}', '${data.email}', '${data.no_telepon}', '${hashedPassword}', '${data.role}')`;
  return dbPool.execute(SQLQuery);
};

const patchUserData = async (iduser, data) => {
  let SQLQuery = `UPDATE users SET `;
  const fieldsToUpdate = [];

  if (data.nama) {
    fieldsToUpdate.push(`nama = '${data.nama}'`);
  }

  if (data.email) {
    fieldsToUpdate.push(`email = '${data.email}'`);
  }

  if (data.no_telepon) {
    fieldsToUpdate.push(`no_telepon = '${data.no_telepon}'`);
  }
  if (data.password !== "") {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    fieldsToUpdate.push(`password = '${hashedPassword}'`);
  }

  if (data.role) {
    fieldsToUpdate.push(`role = '${data.role}'`);
  }
  SQLQuery += fieldsToUpdate.join(", ");
  SQLQuery += ` WHERE id = ${iduser};`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllUsers,
  getUserByID,
  loginUser,
  postAddUser,
  patchUserData,
};
