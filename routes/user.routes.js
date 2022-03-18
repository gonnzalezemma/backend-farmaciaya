const router =require('express').Router();

const {validarCampos} = require('../helpers/validarCampos');

const { body, check } = require('express-validator');

const {validar_jwt}= require('../middlewares/validar_jwt');

const {validarUser} = require('../middlewares/validar_user')

//controllers
const{
    rutaPost,rutaLogin,rutaDelete,rutaGet, rutaPut
}=  require('../controllers/user.controllers')





//Ruta Login
router.post('/login/usuarios',
[
    body('email', 'el correo ingresado no contiene un formato correcto')
    .isEmail()
    .not()
    .isEmpty(),

    body('password', 'El password ingresado no contiene un formato correcto')
    .isString()
    .not()
    .isEmpty(),
    
    validarCampos,
], rutaLogin)



//crear nuevo usuario
router.get('/usuarios/get-user',rutaGet)

//ruta agregar usuarios
router.post('/usuario/create-user',
validarUser,
validarCampos,
rutaPost)


//ruta editar usuario
router.put('/usuario/edit-user/:id',
validar_jwt,
validarUser,
check('id','No es un id de MongoDB válido').isMongoId(),
validarCampos,
rutaPut)


//ruta eliminar usuarios logicamente
router.delete('/usuario/delete-user/:id',
validar_jwt,
check('id','No es un id de MongoDB válido').isMongoId(),
validarCampos,
rutaDelete)




module.exports =router;