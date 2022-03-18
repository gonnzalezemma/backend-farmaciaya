const ctrlPersonas = {};
const Personas = require('../models/personas');

 // Mostrar personas
ctrlPersonas.rutaGet = async (req,res)=>{

    const persona = await Personas.find();

    res.json(persona);
};


ctrlPersonas.rutaPost = async (req,res)=>{
     
    const {body} = req.body;
    body.usuario = req.usuario._id;
    const persona = new Personas(body);

    await persona.save();
    res.json({msg: 'nueva Persona agregada'})
};

module.exports = ctrlPersonas;