const express = require('express');
const cors = require('cors');
const port = process.env.SERVER_PORT;
/**** IMPORT DB */
let DB = require('./db.config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/***** Routage *****/
app.get('/', (req, res) => res.send(`Hello World!`));
app.get('*', (req, res) => res.status(501).send(`Mauvaise requête`));

/***** Lancement du serveur *****/

DB.authenticate()
    .then(() => console.log('connection DB ok'))
    .then(() => {
        app.listen(port, () => console.log(`Serveur lancé sur le port ${port}`));
    })
    .catch(err => console.log('Database error', err));

