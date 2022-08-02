import Serverest from '../../services/serverest.service'
import validaServerest from '../../services/validaServerest.service'
import validacao from '../../fixtures/validaContrato'

describe('Casos de teste da rota de Carrinhos', () => {

        /* ---- GET CARRINHOS ---- */
    it('Deve obter todos os carrinhos', () => {
        Serverest.buscaCarrinho().then(res => {
            validacao.validaContrato(res, 'carrinhos/get-carrinhos', 200)
            validaServerest.validaBuscaCarrinho(res)
        })
    })

        /* ---- GET CARRINHOS PELO ID ---- */
    it('Deve buscar um carrinho pelo ID', () => {
        Serverest.buscaCarrinho().then(res => {
        Serverest.buscaCarrinhoID(res.body.carrinhos[0]['_id']).then(res => {
            validacao.validaContrato(res, 'carrinhos/get-carrinho-id', 200)
            validaServerest.validaBuscaCarrinhoID(res)
        })
     })
    })

        /* ---- POST CARRINHOS ---- */
    it('Deve criar um carrinho', () => {

        Serverest.buscarLoginUsuario().then(usuario => {
            Serverest.fazerLogin(usuario.email, usuario.senha).then(res =>{
                validaServerest.validaFazerLogin(res)
                Serverest.salvarBearer(res)
            })
        })
        Serverest.buscaProduto().then(res =>{
        Serverest.criaCarrinho(res.body.produtos[0]['_id'], 1).then(res =>{
            validacao.validaContrato(res, 'carrinhos/cria-carrinho', 200)
            validaServerest.validaCriaCarrinho(res)
        })
        })
    })
    
        /* ---- DELETE CONCLUI-COMPRA -> CARRINHOS ---- */
    it('Deve concluir uma compra, deletando um carrinho', () =>{
        Serverest.buscarLoginUsuario().then(usuario => {
            Serverest.fazerLogin(usuario.email, usuario.senha).then(res =>{
                validaServerest.validaFazerLogin(res)
                Serverest.salvarBearer(res)
            })
        })

        Serverest.concluiCompra().then(res =>{
            validacao.validaContrato(res, 'carrinhos/conclui-compra', 200)
            validaServerest.validaConcluiCompra(res)
        })
    })

        /* ---- POST CARRINHOS ---- */
    it('Deve criar um carrinho', () => {

            Serverest.buscarLoginUsuario().then(usuario => {
                Serverest.fazerLogin(usuario.email, usuario.senha).then(res =>{
                    validaServerest.validaFazerLogin(res)
                    Serverest.salvarBearer(res)
                })
            })
            Serverest.buscaProduto().then(res =>{
            Serverest.criaCarrinho(res.body.produtos[0]['_id'], 1).then(res =>{
                validacao.validaContrato(res, 'carrinhos/cria-carrinho', 200)
                validaServerest.validaCriaCarrinho(res)
            })
            })
    })

        /* ---- DELETE CANCELA-COMPRA -> CARRINHOS ---- */
    it('Deve cancelar uma compra, deletando um carrinho', () =>{
        Serverest.buscarLoginUsuario().then(usuario => {
            Serverest.fazerLogin(usuario.email, usuario.senha).then(res =>{
                validaServerest.validaFazerLogin(res)
                Serverest.salvarBearer(res)
            })
        })

        Serverest.cancelaCompra().then(res =>{
            validacao.validaContrato(res, 'carrinhos/cancela-compra', 200)
            validaServerest.validaCancelaCompra(res)
        })
    })
})