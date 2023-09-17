class ProductoVenta {
    constructor(id, idVenta, idProducto, cantidadVendida, subtotal, precioVenta) {
        this.id = id;
        this.idVenta = idVenta;
        this.idProducto = idProducto;
        this.cantidadVendida = cantidadVendida;
        this.subtotal = subtotal;
        this.precioVenta = precioVenta;
    }
}

module.exports = ProductoVenta;