const bcrypt = require("bcrypt");

const DB = require("../db.config");
const User = DB.User;
const Adresse = DB.Adresse;

const jwt = require("jsonwebtoken");

const ShowDataUsserAdress = async (userId, res) => {
  let adress = await Adresse.findOne({
    where: { UserIdUser: userId },
  });

  return res.json({ data: adress });
};

exports.getMe = async (req, res) => {
  try {
    ShowDataUsserAdress(TokenUserDecrypt.id_user, res);
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

const methodeUpdateAdress = async (userId, req, res) => {
  console.log(userId);
  // Recherche de l'utilisateur et vérification
  let adress = await Adresse.findOne({
    where: { UserIdUser: userId },
    raw: true,
  });
  /*   if (adress === null) {
    return res.status(404).json({ message: "This user does not exist !" });
  } */

  const { pays, ville, adresse_of_user, cp } = req.body;

  console.log(req.body);

  // Validation des données passées en paramètre api
  if (!pays || !ville || !adresse_of_user || !cp) {
    return res.status(400).json({ message: "We need data" });
  }

  let updatetAdress = {
    adresse_of_user: `${adresse_of_user}`,
    cp: `${cp}`,
    ville: `${ville}`,
    pays: `${pays}`,
    UserIdUser: `${userId}`,
  };

  // Mise à jour de l'adresse
  await Adresse.create(
    {
      adresse_of_user: `${updatetAdress.adresse_of_user}`,
      cp: `${updatetAdress.cp}`,
      ville: `${updatetAdress.ville}`,
      pays: `${updatetAdress.pays}`,
      UserIdUser: `${updatetAdress.UserIdUser}`,
    },
    { where: { UserIdUser: userId } }
  );

  return res.json({ message: "Adress updated" });
};

exports.updateAdress = (req, res) => {
  let userId = parseInt(req.params.id);

  /*  let userIdTypeString = req.params.id; */

  if (TokenUserDecrypt.id_user != userId) {
    return res.status(400).json({ message: "you can't do it" });
  } else {
    try {
      methodeUpdateAdress(userId, req, res);
    } catch (err) {
      return res.status(500).json({ message: "Database Error", error: err });
    }
  }
};
