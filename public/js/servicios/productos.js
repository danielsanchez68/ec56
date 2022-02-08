class ProductosService {
    URL_PRODUCTOS = '/api/productos/'//'https://5c8ef17a3e557700145e85c7.mockapi.io/productos/'

    async obtenerProductos() {
        let productos = await http.get(this.URL_PRODUCTOS)
        return productos
    }

    async guardarProducto(producto) {
        let productoGuardado = await http.post(this.URL_PRODUCTOS, producto)
        return productoGuardado
    }

    async actualizarProducto(id, producto) {
        let productoActualizado = await http.put(this.URL_PRODUCTOS, id, producto)
        return productoActualizado
    }

    async borrarProducto(id) {
        let productoBorrado = await http.delete(this.URL_PRODUCTOS, id)
        return productoBorrado
    }
}

const productosService = new ProductosService()