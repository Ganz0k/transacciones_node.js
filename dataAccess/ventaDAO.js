const db = require('../config/db');
const productoVenta = require('../models/productoVenta');

class VentaDAO {
    constructor() {

    }

    insertVenta(venta, producto, cantidad) {
        db.beginTransaction(err => {
            if (err) {
                throw err;
            }

            let sql = 'INSERT INTO ventas (total, iva) VALUES (?, ?);';
            db.query(sql, [venta.total, venta.iva], (error, results, fields) => {
                if (error) {
                    return db.rollback(() => {
                        throw error;
                    });
                }

                let sql = 'INSERT INTO productos_ventas (id_venta, id_producto, cantidad_vendida, subtotal, precio_venta) VALUES (?, ?, ?, ? ,?);';
                let ventaProducto = new productoVenta(null, results.insertId, producto.id, cantidad, venta.total, venta.total + venta.iva);

                db.query(sql, [ventaProducto.idVenta, ventaProducto.idProducto, ventaProducto.cantidadVendida, ventaProducto.subtotal, ventaProducto.precioVenta], (error, results, fields) => {
                    if (error) {
                        return db.rollback(() => {
                            throw error;
                        });
                    }

                    let sql = 'UPDATE productos SET cantidad = ? WHERE id_producto = ?;';
                    db.query(sql, [producto.cantidad - cantidad, producto.id], (error, results, fields) => {
                        if (error) {
                            return db.rollback(() => {
                                throw error;
                            });
                        }

                        db.commit((err) => {
                            if (err) {
                                return db.rollback(() => {
                                    throw error;
                                });
                            }

                            console.log('Venta registrada');
                            return;
                        });
                    });
                });
            });

        });
    }
}

module.exports = new VentaDAO();