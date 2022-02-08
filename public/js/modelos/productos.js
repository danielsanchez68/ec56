class ProductosModel {
    productos = []

    inicializar(productos) {
        this.productos = productos
    }

    obtener(id) {
        if(id) {
            let producto = this.productos.find(producto => producto.id == id)
            return producto
        }
        else {
            return this.productos
        }
    }

    guardar(producto) {
        this.productos.push(producto)
    }

    actualizar(id, producto) {
        let index = this.productos.findIndex(prod => prod.id == id)
        this.productos.splice(index, 1, producto)
    }

    borrar(id) {
        let index = this.productos.findIndex(prod => prod.id == id)
        this.productos.splice(index, 1)
    }
}

const productosModel = new ProductosModel()