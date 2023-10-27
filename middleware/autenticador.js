const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senha = require('../senhaSecreta')

function autenticador(req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(402).json({ "mensagem": "Acesso negado" })
    }
    const token = authorization.split(' ')[1]

    try {
        const decoder = jwt.verify(token, senha)
        req.usuario_id = decoder.id

        return next()

    } catch (error) {
        console.log(error.message)
        return res.status(402).json({ "mensagem": "Acesso negado" })
    }

}

module.exports = autenticador;