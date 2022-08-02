import Serverest from '../../services/serverest.service'
import validaServerest from '../../services/validaServerest.service'
import validacao from '../../fixtures/validaContrato'
import geradorDados from '../../services/geraDados'

describe('Casos de teste da rota de Login', () => {

        /* ---- GET LOGIN ---- */
    it('Deve realizar login com o último usuário cadastrado', () =>{
        Serverest.buscarLoginUsuario().then(usuario => {
            Serverest.fazerLogin(usuario.email, usuario.senha).then(res =>{
                validacao.validaContrato(res, 'get-login', 200)
                validaServerest.validaFazerLogin(res)
                Serverest.salvarBearer(res)
            })
        })
    })
    
        /* ---- GET LOGIN -> CENÁRIO NEGATIVO ---- */
    it('Não deve realizar login com informações inválidas', () => {
        let userfake = geradorDados.geraUsuario()
            Serverest.fazerLogin(userfake.email, userfake.senha).then(res =>{
                validacao.validaContrato(res, 'get-login', 401)
                validaServerest.validaLoginFake(res)
            })
    })

})