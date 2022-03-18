const {model, Schema}= require('mongoose');


const DescuentoShema = new Schema({
    
    codigoProducto:{
        type: Number,
        required: true
    },
    obraSocial:{
        type: Number,
        required: true
    },
        descuento:{
        type: Number,
    required: true}
});
module.exports = model('Descuento', DescuentoShema);