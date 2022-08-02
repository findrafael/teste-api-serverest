import Serverest from '../../services/serverest.service'
import validaServerest from '../../services/validaServerest.service'
import geradorDados from '../../services/geraDados'
import validacao from '../../fixtures/validaContrato'

describe('Casos de teste da rota de Produtos', () => {

    
        /* ---- GET PRODUTOS ---- */
    it('Deve obter todos os produtos', () => {
        Serverest.buscaProduto().then(res => {
            validacao.validaContrato(res, 'produtos/get-produtos', 200)
            validaServerest.validaBuscaProdutos(res)
        })
    })
    


        /* ---- GET PRODUTOS PELO ID ---- */
    it('Deve obter um produto cadastrado pelo ID', () => {
        Serverest.buscarUltimoProdutoID()
        cy.get('@ultimoProdutoID').then(res =>{
            Serverest.buscaProdutoID(res['_id']).then(res => {
                validacao.validaContrato(res, 'produtos/get-produto-id', 200)
                validaServerest.validaBuscaProdutosID(res)
            })
        })

    })

        /* ---- GET PRODUTOS PELO ID -> CENÁRIO NEGATIVO ---- */
    it('Não deve obter um usuário usando um ID inválido', () =>{
        Serverest.buscaProdutoID('erjBJy7gBJBKJ').then(res => {
            validacao.validaContrato(res, 'produtos/get-produto-id', 400)
            validaServerest.validaNaoBuscaProdutoID(res)
        })
    })



        /* ---- POST PRODUTOS ---- */
    it('Deve cadastrar um novo produto', () => {
        Serverest.buscarLoginUsuario().then(usuario => {
            Serverest.fazerLogin(usuario.email, usuario.senha).then(res =>{
                validaServerest.validaFazerLogin(res)
                Serverest.salvarBearer(res)
            })
        })
        let produto = geradorDados.geraProduto()
        Serverest.criaProduto(produto.nome, produto.preco, produto.descricao, produto.quantidade).then(res =>{
            validacao.validaContrato(res, 'produtos/post-produto', 201)
            validaServerest.validaCriaProduto(res)
        })
    })

        /* ---- POST PRODUTOS -> CENÁRIO NEGATIVO ---- */
    it('Não deve cadastrar um produto existente', () => {
        Serverest.buscarLoginUsuario().then(usuario => {
            Serverest.fazerLogin(usuario.email, usuario.senha).then(res =>{
                validaServerest.validaFazerLogin(res)
                Serverest.salvarBearer(res)
            })
        })
        Serverest.buscaProduto().then(res => {
            let produto = res.body.produtos[0]
            Serverest.criaProduto(produto.nome, produto.preco, produto.descricao, produto.quantidade).then(res =>{
                validacao.validaContrato(res, 'produtos/post-produto', 400)
                validaServerest.validaNaoCriaProduto(res)
            })
        })
        
    })



        /* ---- DELETE PRODUTOS ---- */
    it('Deve editar um produto', () => {
        Serverest.buscarLoginUsuario().then(usuario => {
            Serverest.fazerLogin(usuario.email, usuario.senha).then(res =>{
                validaServerest.validaFazerLogin(res)
                Serverest.salvarBearer(res)
            })
        })

        let produto = geradorDados.geraProduto()        
        Serverest.buscarProdutoAleatorio()
        cy.get('@idRandom').then(res =>{
        Serverest.editaProduto(res['_id'],produto.nome, produto.preco, produto.descricao, produto.quantidade).then(res => {
            validacao.validaContrato(res, 'produtos/put-produto', 200)
            validaServerest.validaEditaProduto(res)
        })
     })
    })

        /* ---- DELETE PRODUTOS -> CENÁRIO NEGATIVO ---- */
    it('Não deve editar um produto com o mesmo nome', () => {
        Serverest.buscarLoginUsuario().then(usuario => {
            Serverest.fazerLogin(usuario.email, usuario.senha).then(res =>{
                validaServerest.validaFazerLogin(res)
                Serverest.salvarBearer(res)
            })
        })

        Serverest.buscarProdutoAleatorio()
        cy.get('@idRandom').then(res =>{
        Serverest.editaProduto(res['_id'],'Logitech MX Vertical', 341, 'Mouse', 123).then(res => {
            validacao.validaContrato(res, 'produtos/put-produto', 400)
            validaServerest.validaNaoEditaProduto(res)
        })
     })
    })


    
        /* ---- DELETE PRODUTOS -> CENÁRIO NEGATIVO ---- */
    it('Deve excluir o último produto cadastrado', () => {
            Serverest.buscarLoginUsuario().then(usuario => {
                Serverest.fazerLogin(usuario.email, usuario.senha).then(res =>{
                    validaServerest.validaFazerLogin(res)
                    Serverest.salvarBearer(res)
                })
            })
            Serverest.buscarUltimoProdutoID()
            cy.get('@ultimoProdutoID').then(res =>{
                Serverest.deletaProdutoID(res['_id']).then(res => {
                    validacao.validaContrato(res, 'produtos/delete-produto', 200)
                    validaServerest.validaDeletaProdutoID(res)
                })
            })
    })
})