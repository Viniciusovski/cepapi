# Sistema de Gerenciamento de Usuários e Endereços com Integração ViaCEP

Este projeto consiste em uma aplicação **full-stack** para gerenciamento de usuários e endereços, com integração ao serviço ViaCEP para busca automática de endereços.

---

## Funcionalidades

### Backend (Spring Boot)

- API REST com **CRUD** de usuários e endereços
- Autenticação via **JWT**
- Integração com o serviço **ViaCEP**
- Paginação e ordenação
- Banco de dados **PostgreSQL**

### Frontend (Angular)

- Tela de login e registro
- Dashboard com listagem de usuários e endereços
- Formulários para cadastro e edição
- Busca de endereço por CEP
- Feedback visual com toasts

---

## Pré-requisitos

- **Java 17** ou superior
- **Maven**
- **Node.js 18.x** ou superior
- **Angular CLI 16.x** ou superior
- **PostgreSQL 14** ou superior

---

## Configuração do Banco de Dados

1. Crie um banco de dados no PostgreSQL:

   ```sql
   CREATE DATABASE cepapi;
   ```

2. Configure as credenciais no arquivo `application.properties` do backend:

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/cepapi
   spring.datasource.username=seu_usuario
   spring.datasource.password=sua_senha
   spring.jpa.hibernate.ddl-auto=update
   ```

---

## Instalação e Execução

### Backend (Spring Boot)

1. Navegue até a pasta do backend:

   ```bash
   cd backend
   ```
2. Compile o projeto com Maven:

   ```bash
   mvn clean package
   ```
3. Execute o aplicativo Spring Boot:

   ```bash
   java -jar target/cepapi-0.0.1-SNAPSHOT.jar
   ```

O backend estará disponível em: `http://localhost:8080`

### Frontend (Angular)

1. Navegue até a pasta do frontend:

   ```bash
   cd frontend
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Execute o servidor de desenvolvimento:

   ```bash
   ng serve
   ```

O frontend estará disponível em: `http://localhost:4200`

---

## Configuração do Ambiente

### Backend

O arquivo de configuração principal está em:

```
src/main/resources/application.properties
```

Configurações importantes:

- Porta do servidor: `server.port=8080`
- Configurações do PostgreSQL: `spring.datasource.*`
- Segurança JWT: `app.jwt.secret` e `app.jwt.expiration`

### Frontend

O arquivo de configuração de ambiente está em:

```
src/environments/environment.ts
```

Configurações importantes:

- URL da API: `apiUrl: 'http://localhost:8080/api'`

---

## Testes

### Backend

Para executar os testes do backend:

```bash
mvn test
```

### Frontend

Para executar os testes do frontend:

```bash
ng test
```

---

## Uso

1. Acesse o frontend: `http://localhost:4200`
2. Faça login com as credenciais:
   - **Admin:** `admin@example.com` / `admin123`
   - **Usuário comum:** `user@example.com` / `user123`

Ou crie uma nova conta através do link **"Criar nova conta"**

### Funcionalidades principais

#### Usuários

- Listar, criar, editar e excluir usuários (apenas admin)
- Paginação e ordenação

#### Endereços

- Listar endereços do usuário logado
- Adicionar novos endereços com busca por CEP
- Editar e excluir endereços

---

## Estrutura de Diretórios

```plaintext
.
├── backend                 # Código fonte do backend (Spring Boot)
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com
│   │   │   │       └── bacelar
│   │   │   │           └── cepapi
│   │   │   │               ├── config
│   │   │   │               ├── controller
│   │   │   │               ├── dto
│   │   │   │               ├── exception
│   │   │   │               ├── model
│   │   │   │               ├── repository
│   │   │   │               ├── security
│   │   │   │               ├── service
│   │   │   │               └── CepApiApplication.java
│   │   │   └── resources
│   │   │       └── application.properties
│   │   └── test           # Testes do backend
├── frontend                # Código fonte do frontend (Angular)
│   ├── src
│   │   ├── app
│   │   │   ├── components
│   │   │   │   ├── auth
│   │   │   │   ├── dashboard
│   │   │   │   ├── user
│   │   │   │   └── address
│   │   │   ├── guards
│   │   │   ├── interceptors
│   │   │   ├── models
│   │   │   ├── services
│   │   │   └── shared
│   │   ├── assets
│   │   └── environments
└── LICENSE
```

---

## Contribuição

1. Faça um fork do projeto  
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push para a branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Abra um Pull Request


---

## Contato

- **Vinicius Bacelar** - [@Linkedin](https://www.linkedin.com/in/viniciusbacelar/)

---

## Link do Projeto

[https://github.com/Viniciusovski/cepapi](https://github.com/Viniciusovski/cepapi)
