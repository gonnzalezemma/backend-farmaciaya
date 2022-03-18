const {model, Schema}= require('mongoose');

const SolicitudAfiliadoShema = new Schema({
    nombreFarmacia:{
        type: String,
        required: true
    },
    
    email:{
        type: String,
        required: true
    },
    CUIL:{
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
            
    },
    estado:{
        type:String,
        default: 'pendiente',
        required: true,
    }
});

module.exports = model('SolicitudAfiliado', SolicitudAfiliadoShema);