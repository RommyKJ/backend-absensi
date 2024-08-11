const UserModel = require("../models/users");
const jwt = require("jsonwebtoken");
const getAllUser = async (req, res) => {
  try {
    const [data] = await UserModel.getAllUsers();
    res.json({
      message: "GET user success",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: err,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    const [data] = await UserModel.getUserByID(idUser);
    res.json({
      message: "GET user success by id",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: err,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { body } = req;
    const [data] = await UserModel.loginUser(body);

    if (data.length !== 0) {
      // Check password here (e.g., compare hashed passwords)
      if (data[0].password === body.password) {
        // Use a secure password comparison method in real applications
        const payload = { userId: data[0].id }; // Create payload based on your user data

        jwt.sign(payload, "secretToken", { expiresIn: "1h" }, (err, token) => {
          if (err) {
            return res.status(500).json({
              message: "Error signing token",
              serverMessage: err,
            });
          }

          res.status(200).json({
            message: "Login Berhasil",
            token,
            data,
          });
        });
      } else {
        res.status(401).json({
          message: "Password Anda salah!",
        });
      }
    } else {
      res.status(404).json({
        message: "Email Anda tidak terdaftar",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: err,
    });
  }
};

const postAddUser = async (req, res) => {
  try {
    const { body } = req;
    const [data] = await UserModel.postAddUser(body);
    res.status(201).json({
      message: "Data karyawan berhasil ditambahkan!",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const patchUpdateUser = async (req, res) => {
  try {
    const { idUser } = req.params;
    const { body } = req;
    const [data] = await UserModel.patchUserData(idUser, body);
    res.status(201).json({
      message: "Data karyawan berhasil diupdate!",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  loginUser,
  postAddUser,
  patchUpdateUser,
};
