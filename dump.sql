create table usuarios (
  id serial primary key,
  nome varchar(150) not null,
  email varchar(200) not null,
  senha varchar(25) not null
)
  
create table pokemons (
  id serial primary key,
  usuario_id serial not null,
  nome text not null,
  habilidade text not null,
  imagem text,
  apelido text 
)

alter table usuarios alter column senha type varchar(300);




