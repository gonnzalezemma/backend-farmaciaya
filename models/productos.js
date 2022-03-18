const {model, Schema}= require('mongoose');

const ProductosShema = new Schema({
    farmacia:{
        type: String,
        required:true
    },
    nombre_producto:{
        type: String,
        required:true
    },
    nombre_generico:{
        type: String,
        required:true
    },
    codigo_producto:{
        type: Number,
        required:true
    },
    
    img:{
        type: String,
        required: false
    },
    descripcion:{
        type: String,
        required: true
    },

    precio:{
        type: Number,
        required:true
    },

    descuento:{
            type: Number,
            required:true
    },
    stock:{
        type: Number,
        required:true
    },
    ventaProducto:{
        type:Number,
        default:0
    },
    estado:{
        type:String,
        default: 'activo',
        required: true,
    },

    activo:{
        type:Boolean,
        default: true
    }
    
});
//process.env.APPHOST
ProductosShema.methods.setImgUrl = function setImgUrl (url_img){
    this.img=`${url_img}`

}

module.exports = model('Productos', ProductosShema);