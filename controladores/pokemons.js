const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const senha = 'not_bacon';

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'locao200',
    database: 'catalogo_pokemon'
});

const cadastrarPokemon = async (req, res) => {
    const { nome, apelido, habilidades, imagem } = req.body;
    const habilidadesArray = habilidades.split(',');
    const user = req.usuario_id
    const query = 'insert into pokemons (usuario_id, nome, apelido, habilidade, imagem) values ($1, $2, $3, $4, $5) returning *';
    try {
        const enviarDados = await pool.query(query, [user, nome, apelido, habilidadesArray, imagem])
        return res.status(200).json(enviarDados.rows[0])

    } catch (error) {
        console.log(error.message)
        return res.status(402).json({ "mensagem": "Acesso negado" })
    }
}

const atualizarApelido = async (req, res) => {
    const { id } = req.params;
    const { apelido } = req.body
    try {
        const pokemon = await pool.query('update pokemons set apelido = $1 where id = $2 returning * ', [apelido, id])
        return res.status(200).json(pokemon.rows[0])
    } catch (error) {
        return res.status(404).json({ mensagem: "Erro no sistema." })
    }

}

const listarPokemons = async (req, res) => {
    const query = 'select * from pokemons where usuario_id = $1'
    const id = req.usuario_id;

    try {
        const listagem = await pool.query(query, [id])
        const lista = listagem.rows

        return res.status(201).json(lista)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ mensagem: "Erro no sistema" })
    }
}

const excluirPokemon = async (req, res) => {
    const query = 'delete from pokemons where id = $1'
    const { id } = req.params

    try {
        const listagem = await pool.query(query, [id])
        const lista = listagem.rows

        return res.status(201).json(lista)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ mensagem: "Erro no sistema" })
    }
}

const procurarPokemon = async (req, res) => {
    const query = 'select * from pokemons where id = $1'
    const { id } = req.params


    try {
        const listagem = await pool.query(query, [id])
        const lista = listagem.rows

        return res.status(201).json(lista)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({ mensagem: "Erro no sistema" })
    }
}
module.exports = {
    cadastrarPokemon,
    atualizarApelido,
    listarPokemons,
    procurarPokemon,
    excluirPokemon
}