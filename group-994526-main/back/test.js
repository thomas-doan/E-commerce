const express = require('express');

const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const PORT = 1234
const SECRET = 'mykey'

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
//bcrypt.crypt
app.use(express.urlencoded({ extended: true}))

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false;
    }
    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}


// verif token
const checkTokenMiddleware = (req, res, next) => {
    //recup token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    //presence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Error: need a token'})
    }

    //veracité du token
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error bad token'})
        } else {
            return next()
        }
    })
}

// Liste des utilisateurs
const users = [
    { id: 1, username: 'admin', password: 'password123'}
]

app.post('/register', (req, res) => {
    //aucune info a traiter

    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'Error, Please enter username and password'})
    }
    //checking
    const userExisting = users.find(u => u.username === req.body.username)

    //pas bon
    if (userExisting) {
        return res.status(400).json( { message: `Error. User ${req.body.username} already existing`});
    }

    // donné du nouvel utilisateur
    const id = users[users.length - 1].id + 1
    const newUser = {
        id: id,
        username: req.body.username,
        password: req.body.password
    }

    // insertion dans le tableau des utilasateur
    users.push(newUser)

    return res.status(201).json( { message: `User ${id} created` })
})


/* ici les futur route */

app.get('/me', checkTokenMiddleware, (req, res) => {
    // recupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    //decodage du token
    const decoded = jwt.decode(token, { complete: false })

    return res.json({content: decoded})
})

app.post('/login', (req, res) => {
    // pas d'information a traiter

    if (!req.body.username || !req.body.password) {
        return res.status(400).json( { message: 'Error Please enter the correct username and password' })
    }

    // Checking
    const user = users.find(u => u.username === req.body.username && u.password === req.body.password)

    //pas bon
    if (!user) {
        return res.status(400).json( { message: 'error: wrong login or password' })
    }

    const token = jwt.sign( {
        id: user.id,
        username: user.username
    }, SECRET, {expiresIn: '3 hours'})

    return res.json( {access_token: token})
})

app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`)
}
);