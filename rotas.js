const express = require('express');
const bcrypt = require('bcrypt');
const pg = require('pg');
const autenticador = require('./middleware/autenticador')
const { cadastrarUsuario, login } = require('./controladores/usuarios');
const { cadastrarPokemon, atualizarApelido, listarPokemons, procurarPokemon, excluirPokemon } = require('./controladores/pokemons');

const rotas = express();
rotas.use(express.json())

rotas.post('/usuarios/cadastro', cadastrarUsuario);
rotas.post('/usuarios/login', login)


rotas.use(autenticador)
rotas.post('/pokemons', cadastrarPokemon);
rotas.put('/pokemons/:id/apelido', atualizarApelido);

rotas.get('/pokemons', listarPokemons);
rotas.get('/pokemons/pokedex/:id', procurarPokemon);

rotas.delete('/pokemons/:id/excluir', excluirPokemon);



rotas.listen(3000)