const router =require('express').Router();
const upload =require('../libs/storage');
const {validar_jwt} = require('../middlewares/validar_jwt')
const{
    rutaPostProducto,rutaVentaProducto,rutaSubirStock,rutaBajarStock,rutaGetProductos,rutaEditProducto, eliminarProducto,checkout
}=  require('../controllers/productos.controllers')




//ver productos
router.get('/productos/todos', rutaGetProductos)


router.post('/productos/subir-producto',upload.single('up_img'), rutaPostProducto)


router.put('/productos/venta/:id',rutaVentaProducto)


router.put('/productos/subirUno/:id',rutaSubirStock)



router.put('/productos/bajarUno/:id',rutaBajarStock)


router.put('/productos/editar/:id',upload.single('up_img'),rutaEditProducto)


router.put('/producto/eliminar/:id',eliminarProducto)

router.post('/producto/checkout',checkout)



module.exports =router;