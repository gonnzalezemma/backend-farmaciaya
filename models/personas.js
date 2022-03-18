const {model, Schema}= require('mongoose');

const PersonaShema = new Schema({
    
    nombre:{
        type: String,
        required:true
        },
    dni:{
        type: String,
        required:true
        },
    celular:{
            type: String,
            required:true
        },
    direccion:{
        type: String,
        required:true
            
    }
});
module.exports = model('Personas', PersonaShema);
