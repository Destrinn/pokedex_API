const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senhaSecreta = require('../senhaSecreta');


const pool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'locao200',
    database: 'catalogo_pokemon'
});

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;
    const query = 'insert into usuarios (nome, email, senha) values ($1,$2,$3) returning *';
    const senhaCriptografada = await bcrypt.hash(senha, 10)

    try {
        const enviarDados = await pool.query(query, [nome, email, senhaCriptografada])
        return res.status(200).json(enviarDados.rows[0])
    } catch (error) {
        console.log(error.message)
        return res.status(402).json({ "mensagem": "Acesso negado" })
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body
    const query = 'select * from usuarios where email = $1'

    try {
        const usuario = await pool.query(query, [email]);
        const validarSenha = await bcrypt.compare(senha, usuario.rows[0].senha);
        const token = await jwt.sign({ id: usuario.rows[0].id }, senhaSecreta, { expiresIn: '1d' })
        const { senha: _, ...usuarioLogado } = usuario.rows[0]

        if (usuario.rowCount < 1) {
            return res.status(402).json({ "Mensagem": "Acesso negado" })
        }
        if (!validarSenha) {
            return res.status(402).json({ "mensagem": "Email/Senha errado" })
        }

        return res.status(202).json({ usuarioLogado, token })
    } catch (error) {
        console.log(error.message)
        return res.status(402).json({ "Mensagem": "Acesso negado" })
    }

}


module.exports = {
    cadastrarUsuario,
    login
}