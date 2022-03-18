const ctrlSolicitudes = {};
const SolicitudFarmacia = require('../models/solicitudFarmacia');
const Farmacia = require('../models/farmacias');
const Usuario = require('../models/users');
const bcryptjs = require('bcryptjs');
const {createPassword} = require('../helpers/generatepassword');
const {enviarCorreo} = require('../helpers/datosEvCorreo') 
//RUTAS GET:
//get afiliados
ctrlSolicitudes.rutaGetFarmacia = async (req,res)=>{

    const soliFarmacia = await SolicitudFarmacia.find()

    res.json(soliFarmacia);
}


//RUTAS POST 
//agregar solicitud afiliados

ctrlSolicitudes.rutaPostFarmacia = async (req,res)=>{
     
    const {nombreFarmacia,email,CUIL,celular,direccion} = req.body;

    const soliFarmacia = new SolicitudFarmacia({nombreFarmacia,email,CUIL,celular,direccion})

    await soliFarmacia.save();
    res.json({msg: 'nueva Persona agregada'})
};


//RUTA PUT para editar LOS ESTADOS DE LAS SOLICITUDES


ctrlSolicitudes.rutaAceptarFarmacia = async (req, res) => {

    const {id} = req.params;
    let solicitudAceptada= {};
   
    solicitudAceptada = await SolicitudFarmacia.findByIdAndUpdate(id, {
        estado: 'aceptado'
    });

    const {nombreFarmacia,email,CUIL,celular,direccion} = solicitudAceptada;


    //se crea el usuario automaticamente

           //farmacia
           var password = createPassword(); //funcion para crear password
            
           //envia correo con sus email y password
   
   
   
           await enviarCorreo(email, password)
           const salt = bcryptjs.genSaltSync();
   
           var passwordHash = bcryptjs.hashSync(password, salt)
           password = passwordHash;
   

    let user = new Usuario({email,password,role: 'farmacia', tipoRole: 'user'
    });

    //Si es aceptado se crea una persona con la informacion
    const farmacia = await Farmacia.findOne({
        CUIL

    })

    if (!farmacia) {
        const newFarm = new Farmacia({nombreFarmacia,email,CUIL,celular,direccion})

        await newFarm.save();

    }
    await user.save()

    return (
        res.status(201).json({
            usuario: user
        }))

}

//rechaza afiliado
ctrlSolicitudes.rutaRechazarFarmacia= async (req,res)=>{

    const {id} = req.params;

    const soliRechazada = await SolicitudFarmacia.findByIdAndUpdate(id,{estado:'rechazado'});

    
    return res.status(201).json({
        msg: "Farmacia rechazada", soliRechazada
    })
               
        
}

module.exports = ctrlSolicitudes;