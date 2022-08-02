const URL_USUARIOS   = '/usuarios/'
const URL_LOGIN     = '/login'
const URL_PRODUTOS  = '/produtos/'
const URL_CARRINHOS = '/carrinhos/'

export default class Serverest {


    // Funções de login
    
    static buscarLoginUsuario(){
        return cy.request(URL_USUARIOS).then(res => {
            return {
                email: res.body.usuarios[0].email,
                senha: res.body.usuarios[0].password
            }
        })
    }

    static fazerLogin(email, senha){
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            failOnStatusCode: false,
            body: {
                "email": email,
                "password": senha
            }
        })
    }

    static salvarBearer(res){
        Cypress.env('bearer', res.body.authorization.slice(7))
    }

    // Funções de Usuário

    static buscarUsuario(){
        return cy.request(URL_USUARIOS)
    }

    static buscarUltimoUsuarioID(){
        cy.request(URL_USUARIOS).then(res => {
            const array = res.body.usuarios
            const ultimo = array[array.length - 1]._id
            cy.wrap({
                _id: ultimo
            }).as('ultimoUsuarioID')
        })
    }

    static buscarUsuarioAleatorio(){
        cy.request(URL_USUARIOS).then(res => {
            const array = res.body.usuarios
            const tamanho = array.length
            const random = Math.floor(Math.random() * tamanho)
            const id = array[random]['_id']
            cy.wrap({
                _id: id
            }).as('idRandom')
        })
    }

    static buscarUsuarioID(id){
        return cy.request({
            url: URL_USUARIOS + id,
            failOnStatusCode: false
        })
    }

    static deletaUsuarioID(id){
        return cy.request({
            method: 'DELETE',
            url: URL_USUARIOS + id,
            failOnStatusCode: false
        })
    }

    static criaUsuario(nome, email, password, administrador){
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            failOnStatusCode: false,
            body: {
                    "nome": nome,
                    "email": email,
                    "password": password,
                    "administrador": administrador
            }
        })
    }
    
    static editaUsuario(id, nome, email, password, administrador){
        return cy.request({
            method: 'PUT',
            url: URL_USUARIOS + id,
            failOnStatusCode: false,
            body: {
                    "nome": nome,
                    "email": email,
                    "password": password,
                    "administrador": administrador
            }
        })
    }

    // Funções de Produtos

    static buscaProduto(){
        return cy.request(URL_PRODUTOS)
    }

    static buscaProdutoID(id){
        return cy.request({
            url: URL_PRODUTOS + id,
            failOnStatusCode: false
        })
    }

    static buscarUltimoProdutoID(){
        cy.request(URL_PRODUTOS).then(res => {
            const array = res.body.produtos
            const ultimo = array[array.length - 1]._id
            cy.wrap({
                _id: ultimo,
            }).as('ultimoProdutoID')
        })
    }

    static buscarProdutoAleatorio(){
        cy.request(URL_PRODUTOS).then(res => {
            const array = res.body.produtos
            const tamanho = array.length
            const random = Math.floor(Math.random() * tamanho)
            const id = array[random]['_id']
            cy.wrap({
                _id: id
            }).as('idRandom')
        })
    }

    static criaProduto(nome, preco, descricao, quantidade){
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            failOnStatusCode: false,
            body: {
                "nome": nome,
                "preco": preco,
                "descricao": descricao,
                "quantidade": quantidade
                  },
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static deletaProdutoID(id){
        return cy.request({
            method: 'DELETE',
            url: URL_PRODUTOS + id,
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static editaProduto(id, nome, preco, descricao, quantidade ){
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + id,
            failOnStatusCode: false,
            body: {
                "nome": nome,
                "preco": preco,
                "descricao": descricao,
                "quantidade": quantidade
            },
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    // Funções de Carrinhos

    static buscaCarrinho(){
        return cy.request(URL_CARRINHOS)
    }

    static buscaCarrinhoID(id){
        return cy.request(URL_CARRINHOS + id)
    }

    static criaCarrinho(idProduto, quantidade){
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            failOnStatusCode: false,
            body: {
                "produtos": [{
                    "idProduto": idProduto,
                    "quantidade": quantidade
                  }]
                  },
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static concluiCompra(){
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + 'concluir-compra/',
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }

    static cancelaCompra(){
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + 'cancelar-compra/',
            auth: {
                bearer: Cypress.env('bearer')
            }
        })
    }
}