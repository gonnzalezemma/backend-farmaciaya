const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
// SDK de Mercado Pago
const mercadopago = require ('mercadopago');
const bodyParser = require('body-parser');
const cloudinary =require('cloudinary');

    cloudinary.config({
        cloud_name: "dk8x33xiv",
        api_key: 843423288518839,
        api_secret: "theCbXzQpLn02U0r63HTokWOzj0",

    })




// Agrega credenciales
mercadopago.configure({
  access_token: 'APP_USR-5946785365143205-121315-5039f3aeaa7aef2ea23bf442daf35c0d-1038372659'
});


//inicializaciones
const app = express();
require('dotenv').config();
require('./connection');

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//conexion al server
app.set("port", process.env.PORT || 5000);
 app.use('/public', express.static(`${__dirname}/storage/images`))
//rutas 
app.use(require('./routes/user.routes'));
app.use(require('./routes/solicitudes.routes'))
app.use(require('./routes/productos.routes'))
//devuelve la conexion
app.listen(app.get("port"),()=>
    console.log(`server on port ${app.get("port")}`)
);
