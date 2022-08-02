import Serverest from '../../services/serverest.service'
import validaServerest from '../../services/validaServerest.service'
import geradorDados from '../../services/geraDados'
import validacao from '../../fixtures/validaContrato'


describe('Casos de teste da rota de Usuários', () => {

    
        /* ---- GET USUÁRIOS ---- */
    it('Deve obter todos os usuários cadastrados.', () => {
        Serverest.buscarUsuario().then(res => {
            validacao.validaContrato(res, 'usuarios/get-usuarios', 200)
            validaServerest.validaBuscaUsuarios(res)
        })
    })



        /* ---- GET USUÁRIOS PELO ID ---- */
    it('Deve obter o último usuário cadastrado pelo id', () =>{
        Serverest.buscarUltimoUsuarioID()
        cy.get('@ultimoUsuarioID').then(res => {
            Serverest.buscarUsuarioID(res['_id']).then(res => {
                validacao.validaContrato(res, 'usuarios/get-usuario-id', 200)
            })
        })
    })

        /* ---- GET USUÁRIOS PELO ID -> CENÁRIO NEGATIVO ---- */
    it('Não deve obter um usuário informando um ID inválido', () => {
        Serverest.buscarUsuarioID('issoeumidinvalido').then(res => {
            validacao.validaContrato(res, 'usuarios/get-usuario-id', 400)
            validaServerest.validaNaoBuscarUsuarioID(res)
        })
    })



        /* ---- POST USUÁRIOS ---- */
    it('Deve cadastrar um novo usuário', () => {
        let usuario = geradorDados.geraUsuario()
        Serverest.criaUsuario(usuario.nome, usuario.email, usuario.senha, 'true').then(res => {
            validacao.validaContrato(res, 'usuarios/post-usuario', 201)
            validaServerest.validaCriaUsuarioSucesso(res)
        })
    })

        /* ---- POST USUÁRIOS -> CENÁRIO NEGATIVO ---- */
    it('Não deve cadastrar um usuário já existente', () => {
        
        Serverest.buscarUsuario().then(res => {
            let usuario = res.body.usuarios[0]
            Serverest.criaUsuario(usuario.nome, usuario.email, usuario.password, 'true').then(res => {
                validacao.validaContrato(res, 'usuarios/post-usuario', 400)
                validaServerest.validaCriaUsuarioSemSucesso(res)
            })
        })
        
    })



        /* ---- PUT USUÁRIOS ---- */
    it('Deve alterar um usuário existente', () => {
        let usuario = geradorDados.geraUsuario()
        Serverest.buscarUsuarioAleatorio()
        cy.get('@idRandom').then(res =>{
        Serverest.editaUsuario(res['_id'], usuario.nome, usuario.email +'.xyz', usuario.senha,'true').then( res => {
            validacao.validaContrato(res, 'usuarios/put-usuario', 200)
            validaServerest.validaEditaUsuario(res)
        })
    })
    })

        /* ---- PUT USUÁRIOS -> CENÁRIO NEGATIVO ---- */
    it('Não deve alterar um usuário existente com um e-mail já cadastrado', () => {

        Serverest.buscarUsuario().then(res => {
            let user = res.body.usuarios[0]
            let user2 = res.body.usuarios[1]
            Serverest.editaUsuario(user2['_id'], user.nome, user.email, user.password,'true').then( res => {
                validacao.validaContrato(res, 'usuarios/put-usuario', 400)
                validaServerest.validaNaoEditaUsuario(res)
            })
        })
        
    
    })
    


        /* ---- DELETE USUÁRIOS ---- */
    it('Deve deletar o último usuário cadastrado pelo ID', () =>{
            Serverest.buscarUltimoUsuarioID()
            cy.get('@ultimoUsuarioID').then(res => {
                Serverest.deletaUsuarioID(res['_id']).then(res => {
                    validacao.validaContrato(res, 'usuarios/delete-usuario', 200)
                    validaServerest.validaDeletarUsuarioID(res)
                })
            })
    
    })

        /* ---- DELETE USUÁRIOS -> CENÁRIO NEGATIVO ---- */
    it('Não deve deletar um usuário que possuí carrinho', () => {
        Serverest.buscarUsuario().then(res => {
            let usuario = res.body.usuarios[0]
            Serverest.deletaUsuarioID(usuario['_id']).then(res => {
                validacao.validaContrato(res, 'usuarios/delete-usuario', 400)
                validaServerest.validaNaoDeletaUsuarioID(res)
            })
        })
    })

})
