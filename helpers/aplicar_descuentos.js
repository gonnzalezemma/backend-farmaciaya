

const aplicar_descuento = (descuento,precio) => {

    
let porcentaje= descuento/100;

let cantidad_descuento = precio*porcentaje

let precio_final = (precio-cantidad_descuento)
return (precio_final)
};


module.exports ={
    aplicar_descuento
}
