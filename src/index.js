require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 4000;
const usersRoute = require("./routes/users");
const absenRoute = require("./routes/absen");
const middleware = require("./middleware/log");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(middleware);
app.use(express.json());
app.use(cors());
app.use("/img", express.static("src/uploads"));
app.use("/users", usersRoute);
app.use("/absen", absenRoute);
app.listen(PORT, () => {
  console.log(`Server berhasil dirunning ${PORT}`);
});
