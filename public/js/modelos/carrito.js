class CarritoModel {
    carrito = []

    inicializar(productos) {
        this.carrito = productos
    }

    obtener(id) {
        if(id) {
            let producto = this.carrito.find(producto => producto.id == id)
            return producto
        }
        else {
            return this.carrito
        }
    }

    productoExiste(producto) {
        return this.carrito.filter(prod => prod.id == producto.id).length
    }

    obtenerProducto(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }

    guardar(producto) {
        this.carrito.push(producto)
    }

    actualizar(id, producto) {
        let index = this.carrito.findIndex(prod => prod.id == id)
        this.carrito.splice(index, 1, producto)
    }

    borrar(id) {
        let index = this.carrito.findIndex(prod => prod.id == id)
        this.carrito.splice(index, 1)
    }
}

const carritoModel = new CarritoModel()