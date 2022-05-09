# Mandacaru API

Sistema para suporte à avaliação do consumo alimentar e cálculo de receitas foi desenvolvido para ser um sistema que apoie pesquisadores da área de nutrição na obtenção de dados de consumo alimentar mais acurados, além de ser ferramenta para registrar e calcular as informações obtidas pela aplicação de inquéritos dietéticos na prática profissional do nutricionista.

## Tecnologias

- [Typescript](https://www.typescriptlang.org/)
- [NodeJs](https://nodejs.org/en/)
- [OvernightJs](https://github.com/seanpmaxwell/overnight)
- [Express](https://expressjs.com/pt-br/)
- [PostgreSQL](https://www.postgresql.org/)
- [Axios](https://github.com/axios/axios)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/pt-BR/)
- [Supertest](https://github.com/visionmedia/supertest)
- [JSON Web Tokens](https://jwt.io/)
- [Babel](https://babeljs.io/)

## Documentação

[Documentação da API](https://osanes-mandacaru-api.herokuapp.com/api-docs/)

## Executar a aplicação localmente

Clone o projeto

```bash
  git clone git@github.com:OSANES-Mandacaru/mandacaru-api.git
```

Entre para o diretório do projeto

```bash
  cd mandacaru-api
```

 - Use o arquivo .env.examples para configurar suas credenciais


Instale as dependências

```bash
  yarn install
```

Inicie o servidor

```bash
  yarn start:dev
```

## Estrutura

  - @src = ./src
  - @auth = ./src/modules/auth

<hr>

### 1 - @src
  - `index.ts`: ponto de entrada
  - `server.ts`: configuração do servidor
  - `DefaultRoute.ts`: rota default que redireciona para a documentação

<hr>

#### 1.1 - @src/docs
Neste diretório ficam os contratos, protocolos de cada entidade e a documentação do swagger

<hr>

#### 1.2 - @src/types
Diretório destinado a tipagem para uso do supertest e contrato para o request

<hr>

#### 1.3 - @src/errors
Neste diretório ficam os tratamentos de erros genéricos 

<hr>

#### 1.4 - @src/infra
Neste diretório ficam as funções relacionadas as libs e ao banco

Exemplo:
  - `UUID.ts` - gerar UUID ou validar
  - `typeormManagers.ts` - instanciar manipuladores do typeorm
  - `userManagers.ts` - representação dos manipuladores para usuário

 **"Manipuladores" são funções do typeorm que permitem acessar e fazer manipulações no banco de dados**

<hr>

#### 1.5 - @src/middlewares
Neste diretório ficam os middlewares que podem ser acessados por qualquer camada do projeto

Exemplo:
  - `validateIdParams.ts` - valida o uuid vindo do request params
  - `beginInstances` -  inicializa as instâncias do services

<hr>

#### 1.6 - @src/modules
Neste diretório fica toda regra de negocio, entidades e suas dependências, e tudo divido em camadas.

<hr>

### 2 - @auth
Esta é a camada de autorização, responsável pelas entidades de Address, Admin, Subject e User.

#### 2.1 - @auth/controllers
Por conta da abstração do overnightjs, os controllers sobrescrevem as rotas, portanto, nesse diretório ficam as rotas e os controllers para suas entidades especificas.


Exemplos:

 - `UserController.ts`:
    - `@Controller('user')`:
      - Nível: class
      - Descrição: define a classe inteira como uma rota para o endpoint de `/user`
    - `@Post('')`:
      - Nível: method
      - Descrição: define o método da classe como um método de requisição HTTP do tipo `POST`
      - Endpoint: como o parâmetro passado foi uma string vazia, seu endpoint continua sendo apenas `/user`
    - `@Middleware(createUser)`
      - Nível: method
      - Descrição: executa os middlewares fornecidos, que nesse exemplo em especifico é o middleware para validar os dados de criação do usuário

 - `SubjectController.ts`:
    - `@Controller('subject')`:
      - Nível: class
      - Descrição: define a classe inteira como uma rota para o endpoint de `/subject`
    - `@Get(':id')`:
      - Nível: method
      - Descrição: define o método da classe como um método de requisição HTTP do tipo `GET`
      - Endpoint: `/subject/:id` e como o parâmetro é do tipo
      - Observação: como o parâmetro é do tipo "`:(alguma coisa)`" isso indica que é possível resgatar o valor do parâmetro através do `request.params`
    - `@Middleware([validateIdParams, authUser...`
      - Nível: method
      - Descrição: executa os middlewares fornecidos


<hr>

#### 2.2 - @auth/entities
Neste diretório ficam as implementações de cada entidade junto com suas especificações 

<hr>

#### 2.3 - @auth/errors
Neste diretório ficam os tratamentos de erros específicos para cada entidade

<hr>

#### 2.4 - @auth/clients
Neste diretório ficam as consultas de api's externas

Exemplo:
  - `ViaCep` - API para validar CEP

<hr>

#### 2.5 - @auth/formatting
Neste diretório ficam as funções para formatar os dados antes de retornar ao usuário.

<hr>

#### 2.6 - @auth/middlewares
Neste diretório ficam os middlewares de validação de dados e entidades

<hr>

#### 2.7 - @auth/services
Neste diretório ficam services que são responsáveis pelas execução da regra de negocio

<hr>

## Autores

- [@iago-f-s-e](https://github.com/iago-f-s-e)
