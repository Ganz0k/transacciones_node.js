const ventaDAO = require('./dataAccess/ventaDAO');
const producto = require('./models/producto');
const venta = require('./models/venta');

let productoVender = new producto(1, 'Ejemplo1', 35.50, 50);
let cantidadVender = 5;
let nuevaVenta = new venta(null, productoVender.precio, productoVender.precio * .16);

ventaDAO.insertVenta(nuevaVenta, productoVender, cantidadVender);