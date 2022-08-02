const faker = require('faker-br');

let nomeUsuarioFake = faker.name.findName()
let emailUsuarioFake = faker.internet.email()
let senhaUsuarioFake = faker.internet.password()

export default class geradorDados{
    
    static geraUsuario(){
        return {
            'nome': nomeUsuarioFake,
            'email': emailUsuarioFake,
            'senha': senhaUsuarioFake
        }
    }

    static geraProduto(){
        return {
                "nome": faker.commerce.productName(),
                "preco": faker.commerce.price(),
                "descricao": faker.commerce.department(),
                "quantidade": faker.random.number()
        }
    }
}