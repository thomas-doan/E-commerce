const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DB = require("../db.config");
const User = DB.User;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "The email or Password is empty !" });
  }
  try {
    const user = await User.findOne({ where: { email: email }, raw: true });
    if (!user) {
      return res
        .status(401)
        .json({ message: "We can 't find your account :/ are you sure ? " });
    }
    let test = await User.checkPassword(password, user.password);
    if (!test) {
      return res.status(401).json({ message: "The password is wrong :/" });
    }
    const token = jwt.sign(
      {
        id_user: user.id_user,
        fk_role: user.fk_role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_DURING }
    );

    return res.json({ access_token: token });
  } catch (err) {
    if (err.name == "SequelizeDatabaseError") {
      res
        .status(500)
        .json({ message: "Wrong connection Database !", error: err });
    }
    res.status(500).json({ message: "the login failed !", error: err });
  }
};

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Need email or password or username" });
  }
  try {
    const user = await User.findOne({ where: { email: email }, raw: true });
    if (user) {
      return res
        .status(409)
        .json({ message: `The email ${email} already exists !` });
    }
    const InsertUser = {
      username: `${username}`,
      password: `${password}`,
      email: `${email}`,
    };
    const userCreated = await User.create({
      username: `${InsertUser.username}`,
      password: `${InsertUser.password}`,
      email: `${InsertUser.email}`,
    });

    return res.json({ message: "User Created", data: userCreated });
  } catch (err) {
    if (err.name == "SequelizeDatabaseError") {
      res.status(500).json({ message: "Database Error", error: err });
    }
    res.status(500).json({ message: "Hash Process Error", error: err });
  }
};
