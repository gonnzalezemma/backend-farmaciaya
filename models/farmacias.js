const {model, Schema}= require('mongoose');

const FarmaciaShema = new Schema({
     nombreFarmacia:{
        type: String,
        required:true
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
            
    }
});
module.exports = model('Farmacia', FarmaciaShema);