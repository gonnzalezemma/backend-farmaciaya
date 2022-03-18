const ctrlProductos = {};
const Productos = require('../models/productos');
const {aplicar_descuento}= require('../helpers/aplicar_descuentos');
const cloudinary = require('cloudinary');
const mercadopago = require('mercadopago');
const bodyParser = require('body-parser');


ctrlProductos.rutaGetProductos = async(req,res)=>{

    const productos = await Productos.find()

    res.json(productos);
}


ctrlProductos.rutaPostProducto=async (req,res)=>{

    const {farmacia,nombre_producto,nombre_generico,codigo_producto,descripcion,precio,descuento, stock}= await req.body

    let precioCnDescuento = aplicar_descuento(descuento,precio);

    const producto = new Productos({farmacia,nombre_producto,nombre_generico,codigo_producto,descripcion,precio,descuento,precioCnDescuento, stock})

    const result =  await cloudinary.v2.uploader.upload(req.file.path);
    var url_img = result.url;
    producto.setImgUrl(url_img);
  
    await producto.save();
    res.json({msg: 'Producto agregado'})
}

ctrlProductos.rutaBajarStock=async (req,res)=>{
    
    const {id} = req.params;
    const producto = await Productos.findByIdAndUpdate(id,{$inc:{stock:-1}});
    if (stock=0){
     await Productos.findByIdAndUpdate(id,{estado:"inactivo"})
     
     return res.status(200).json({msg:"No hay estock del producto"})
    }
    return res.status(201).json({
        msg: "Stock -1", producto
    })
    
}

ctrlProductos.rutaSubirStock=async (req,res)=>{
    
    const {id} = req.params;
    const producto = await Productos.findByIdAndUpdate(id,{$inc:{stock:1}});


    return res.status(201).json({
        msg: "Stock +1", producto
    })

}


//venta producto
ctrlProductos.rutaVentaProducto = async(req,res)=>{

    const {id}=req.params;
    const {ventaProducto}=req.body;
    const producto = await Productos.findByIdAndUpdate(id,{$inc:{"stock":-ventaProducto}});
    return res.status(201).json({
        venta:`${ventaProducto}`,
        totalVendidos: ` ${producto.contadorVendidos+ventaProducto}`,
        producto: producto.nombre_producto,
    })

}

ctrlProductos.rutaEditProducto = async(req,res)=>{

    const {id}=req.params;
    let {farmacia,nombre_producto,descripcion,precio,descuento,stock}= req.body;

    let precioCnDescuento = aplicar_descuento(descuento,precio);

    const producto = await Productos.findByIdAndUpdate(id,{farmacia,nombre_producto,descripcion,precio,descuento,precioCnDescuento, stock})

    const result =  await cloudinary.v2.uploader.upload(req.file.path);
    var url_img = result.url;
    producto.setImgUrl(url_img);
    
    return res.json(producto)
}

ctrlProductos.eliminarProducto = async (req,res)=>{

    const {id} = req.params;

    const user =await Productos.findByIdAndUpdate(id,{ activo: false });

    
    //responde si fue eliminado correctamente

    return res.status(201).json({
        msg: "producto removido logicamente", user
    })
}


ctrlProductos.checkout= async (req,res)=>{

    let preference = {
        items: [
          {
            title: req.body.tittle,
            unit_price: parseInt(req.body.precio),
            quantity: 1,
          }
        ]
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
        res.redirect(response.body.init_point)
      }).catch(function(error){
        console.log(error);
      });
}


module.exports = ctrlProductos;