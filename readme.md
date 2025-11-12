## Desenvolvimento Full Stack II

Carango Show API

Nome: Allan K. Scain, Flamarion Fagundes,
Luan Sananda e Manuela Kleinkauf

### Como executar o projeto?

Criar um arquivo `.env` na raiz do projeto seguindo o `.env.example`.

Instalar as dependências

```bash
npm install
```

Criar as tabelas necessárias

```bash
npm run migrate
```

Executar o servidor de desenvolvimento

```bash
npm run dev
```

Subir a carga de dados iniciais

```bash
npm run seed
```

Executar o código de produção

```bash
npm run build

&&

npm start
```

OBS: Para executar algum comando em `Produção`, crie um arquivo `.env.prd` na raiz do projeto, adicione as credenciais de
produção, incluindo `NODE_ENV="production"` e então execute:

```bash
dotenv -e .env.prd -- comando-aqui
```

Caso ainda não tenha o [dotenv-cli](https://www.npmjs.com/package/dotenv-cli), pode instalar com:

```bash
npm install -g dotenv-cli
```

### Via Docker

Buildar a imagem

```bash
docker compose build
```

Subir o container

```bash
docker compose up -d
```

Buildar a imagem e subir o container

```bash
docker compose up --build -d
```

Parar e remover o container

```bash
docker compose down
```
