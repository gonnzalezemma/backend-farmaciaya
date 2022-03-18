const router =require('express').Router();

const{
    rutaGetFarmacia, rutaPostFarmacia, rutaAceptarFarmacia,rutaRechazarFarmacia
}=  require('../controllers/solicitudes.controllers')

//crear nuevo usuario
router.get('/farmacia/ver-solicitudes',rutaGetFarmacia)



//ruta agregar usuarios

router.post('/farmacia/enviar-solicitudes',rutaPostFarmacia)




//Si usuario es aceptado
router.put('/farmacia/solicitud-aceptada/:id',rutaAceptarFarmacia)



//Si usuario es rechazado
router.put('/farmacia/solicitud-rechazada/:id',rutaRechazarFarmacia)




module.exports =router;