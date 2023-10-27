# Catálogo de Pokémons com Autenticação

Este é um projeto de API que permite aos usuários catalogar seus Pokémons com autenticação. A API inclui funcionalidades de cadastro e gerenciamento de usuários e de Pokémons. Os principais requisitos e funcionalidades do projeto são os seguintes:

## Requisitos do Banco de Dados

- O projeto utiliza um banco de dados chamado `catalogo_pokemons` com duas tabelas: `usuarios` e `pokemons`. O script de criação das tabelas está disponível em `dump.sql`.

### Tabela `usuarios`:

- `id` (Chave primária e auto incremento) - Identificador único do usuário.
- `nome` (Obrigatório) - Nome do usuário.
- `email` (Obrigatório e único) - Endereço de e-mail do usuário.
- `senha` (Obrigatório) - Senha do usuário criptografada com bcrypt.

### Tabela `pokemons`:

- `id` (Chave primária e auto incremento) - Identificador único do Pokémon.
- `usuario_id` (Obrigatório) - Identificador do usuário proprietário do Pokémon.
- `nome` (Obrigatório) - Nome do Pokémon.
- `habilidades` (Obrigatório) - Habilidades do Pokémon (uma string de habilidades separadas por vírgulas).
- `imagem` - URL da imagem do Pokémon.
- `apelido` - Apelido do Pokémon.

## Funcionalidades de Usuários

- Cadastro de usuários com criptografia da senha usando a biblioteca bcrypt.
- Login de usuários com validação das credenciais usando a biblioteca bcrypt.
- Geração de token de autenticação com a biblioteca jsonwebtoken.

## Funcionalidades de Pokémons

- Cadastro de Pokémons.
- Atualização apenas do apelido de um Pokémon.
- Listagem completa de todos os Pokémons catalogados.
- Listagem de um Pokémon específico por ID.
- Exclusão de Pokémons.

### Requisitos Importantes

- O token de autenticação deve ser enviado no cabeçalho da requisição (authorization) no formato "Bearer Token".
- O `usuario_id` não deve ser fornecido no corpo da requisição, mas deve ser obtido a partir do token no cabeçalho.

## Exemplo de Cadastro de Pokémon:

```json
{
    "nome": "Pikachu",
    "apelido": "pikachu",
    "habilidades": "static, lightning-rod",
    "imagem": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
}
