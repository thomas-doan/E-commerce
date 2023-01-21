/***********************************/
/*** Import des module nécessaires */
const bcrypt = require("bcrypt");

const DB = require("../db.config");
const User = DB.User;
const Adresse = DB.Adresse;

const jwt = require("jsonwebtoken");

exports.getAllUsers = (req, res) => {
  if (TokenUserDecrypt.fk_role == 2) {
    User.findAll()
      .then((users) => res.json({ data: users }))
      .catch((err) =>
        res.status(500).json({ message: "Database Error", error: err })
      );
  } else {
    return res
      .status(401)
      .json({ message: "You are not allowed to access this route !" });
  }
};

const ShowDataUser = async (userId, res) => {
  let user = await Adresse.findOne({
    where: { UserIdUser: userId },
    include: {
      model: User,
      attributes: ["username", "email", "fk_role", "password"],
    },
  });
  if (user === null) {
    user = await User.findOne({ where: { id_user: userId } });
  }

  return res.json({ data: user });
};

exports.getMe = async (req, res) => {
  try {
    ShowDataUser(TokenUserDecrypt.id_user, res);
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.getMeWithoutAdress = async (req, res) => {
  try {
     user = await User.findOne({ where: { id_user: TokenUserDecrypt.id_user } })
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.getUser = (req, res) => {
  let userId = parseInt(req.params.id);
  let userIdTypeString = req.params.id;

  // Vérification si le champ id est présent et cohérent
  if (!userId) {
    return res.json(400).json({ message: "Missing Parameter" });
  }

  try {
    if (TokenUserDecrypt.fk_role == 1) {
      if (TokenUserDecrypt.id_user !== userIdTypeString) {
        return res
          .status(401)
          .json({ message: "You are not allowed to access this route !" });
      } else {
        ShowDataUser(userId, res);
      }
    }

    if (TokenUserDecrypt.fk_role == 2) {
      ShowDataUser(userId, res);
    }
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.addUser = async (req, res) => {
  if (TokenUserDecrypt.fk_role == 2) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Need another data" });
    }

    try {
      if (TokenUserDecrypt.fk_role == 1) {
        return res
          .status(401)
          .json({ message: "You are not allowed to access this route !" });
      } else {
        const user = await User.findOne({ where: { email: email }, raw: true });
        if (user !== null) {
          return res
            .status(409)
            .json({ message: `The email ${email} already exists !` });
        }

        let InsertUser = {
          username: `${username}`,
          password: `${password}`,
          email: `${email}`,
        };

        let userCreated = await User.create({
          username: `${InsertUser.username}`,
          password: `${InsertUser.password}`,
          email: `${InsertUser.email}`,
        });

        return res.json({ message: "User Created", data: userCreated });
      }
    } catch (err) {
      if (err.name == "SequelizeDatabaseError") {
        res.status(500).json({ message: "Database Error", error: err });
      }
      res.status(500).json({ message: "Hash Process Error", error: err });
    }
  } else {
    return res
      .status(401)
      .json({ message: "You are not allowed to access this route !" });
  }
};

const methodeUpdateUser = async (userId, req, res) => {
  // Recherche de l'utilisateur et vérification
  let user = await User.findOne({ where: { id_user: userId }, raw: true });
  if (user === null) {
    return res.status(404).json({ message: "This user does not exist !" });
  }

  const { username, email, password } = req.body;

  // Validation des données passées en paramètre api
  if (!username || !email || !password) {
    return res.status(400).json({ message: "We need data" });
  }
  /*   let newPasswordHash = await bcrypt.hash(
    password,
    parseInt(process.env.BCRYPT_SALT_ROUND)
  ); */

  let updatetUser = {
    username: `${username}`,
    password: `${password}`,
    email: `${email}`,
  };

  // Mise à jour de l'utilisateur
  await User.update(
    {
      username: `${updatetUser.username}`,
      password: `${updatetUser.password}`,
      email: `${updatetUser.email}`,
    },
    { where: { id_user: userId } }
  );
  return res.status(200).json({ message: "User Updated" });
};

const methodeUpdateUserWithAdress = async (UserIdUser, req, res) => {
  // Recherche de l'utilisateur et vérification
  let user = await User.findOne({ where: { id_user: UserIdUser }, raw: true });
  console.log(UserIdUser);

  console.log(req.body.User);
  const { username, email, password, fk_role } = req.body.User;
  const { adresse_of_user, cp, ville, pays } = req.body;

  // Validation des données passées en paramètre api
  if (
    !fk_role ||
    !username ||
    !email ||
    !password ||
    !adresse_of_user ||
    !cp ||
    !ville ||
    !pays
  ) {
    return res.status(400).json({ message: "We need data !!!!" });
  }
  /*   let newPasswordHash = await bcrypt.hash(
    password,
    parseInt(process.env.BCRYPT_SALT_ROUND)
  ); */

  let newPasswordHash = password;
  let updatetUser = {
    username: `${username}`,
    password: `${password}`,
    email: `${email}`,
    fk_role: `${fk_role}`,
  };

  let updatetAdress = {
    adresse_of_user: `${adresse_of_user}`,
    cp: `${cp}`,
    ville: `${ville}`,
    pays: `${pays}`,
  };

  // Mise à jour de l'utilisateur
  await User.update(
    {
      username: `${updatetUser.username}`,
      password: `${updatetUser.password}`,
      email: `${updatetUser.email}`,
      fk_role: `${updatetUser.fk_role}`,
    },
    { where: { id_user: UserIdUser } }
  );

  let Adress = await Adresse.findOne({ where: { UserIdUser: UserIdUser } });
  if (user === null) {
    return res.status(404).json({ message: "This user does not exist !" });
  }

  // Mise à jour de l'adresse
  await Adress.update(
    {
      adresse_of_user: `${updatetAdress.adresse_of_user}`,
      cp: `${updatetAdress.cp}`,
      ville: `${updatetAdress.ville}`,
      pays: `${updatetAdress.pays}`,
    },
    { where: { UserIdUser: UserIdUser } }
  );
  return res.json({ message: "User Updated" });
};

exports.updateUser = (req, res) => {
  let userId = parseInt(req.params.id);
  let userIdTypeString = req.params.id;

  if (TokenUserDecrypt.fk_role == 2) {
    // Vérification si le champ id est présent et cohérent
    if (!userId) {
      return res.status(400).json({ message: "Missing parameter" });
    }

    try {
      methodeUpdateUser(userId, req, res);
    } catch (err) {
      return res.status(500).json({ message: "Database Error", error: err });
    }
  }

  if (TokenUserDecrypt.fk_role == 1) {
    if (TokenUserDecrypt.id_user !== userIdTypeString) {
      return res
        .status(401)
        .json({ message: "You are not allowed to access this route !" });
    } else {
      try {
        methodeUpdateUser(userId, req, res);
      } catch (err) {
        return res.status(500).json({ message: "Database Error", error: err });
      }
    }
  }
};

exports.updateUserWithAdress = (req, res) => {
  let userId = parseInt(req.params.id);
  let userIdTypeString = req.params.id;

  if (TokenUserDecrypt.fk_role == 2) {
    // Vérification si le champ id est présent et cohérent
    if (!userId) {
      return res.status(400).json({ message: "Missing parameter" });
    }

    try {
      methodeUpdateUserWithAdress(userId, req, res);
    } catch (err) {
      return res.status(500).json({ message: "Database Error", error: err });
    }
  }

  if (TokenUserDecrypt.fk_role == 1) {
    if (TokenUserDecrypt.id_user !== userIdTypeString) {
      return res
        .status(401)
        .json({ message: "You are not allowed to access this route !" });
    } else {
      try {
        methodeUpdateUserWithAdress(userId, req, res);
      } catch (err) {
        return res.status(500).json({ message: "Database Error", error: err });
      }
    }
  }
};

exports.untrashUser = (req, res) => {
  let userId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  User.restore({ where: { id_user: userId } })
    .then(() => res.status(204).json({ message: "User restore to trash" }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

exports.trashUser = (req, res) => {
  let userId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  // Suppression de l'utilisateur
  User.destroy({ where: { id_user: userId } })
    .then(() => res.status(204).json({ message: "user in trash" }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};

exports.deleteUser = (req, res) => {
  let userId = parseInt(req.params.id);

  // Vérification si le champ id est présent et cohérent
  if (!userId) {
    return res.status(400).json({ message: "Missing parameter" });
  }

  // Suppression de l'utilisateur
  User.destroy({ where: { id_user: userId }, force: true })
    .then(() =>  res.status(204).json({ message: "user delete" }))
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );

     
};


