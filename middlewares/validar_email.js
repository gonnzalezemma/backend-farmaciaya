const Usuario = require('../models/users');

const ExisteEmail = async( email = '') => {
    const emailEncontrado = await  Usuario.findOne({email});

    if(emailEncontrado){
        throw new Error('El email ya existe')
    }
}

module.exports = {
    ExisteEmail 
}