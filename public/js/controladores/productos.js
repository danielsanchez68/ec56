class ProductosController {

    async obtenerProductos() {
        let productos = await productosService.obtenerProductos()
        return productos
    }

    async guardarProducto(producto) {
        //persisto en el backend
        let productoGuardado = await productosService.guardarProducto(producto)

        //actualizo modelo local
        productosModel.guardar(productoGuardado)

        //recargo la vista
        renderProds(productosModel.obtener())
        
        return productoGuardado
    }


    async actualizarProducto(id) {
        //console.log('actualizarProducto', id)

        //Obtengo los datos del formulario
        let producto = leerProductoIngresado()
        limpiarFormulario()

        //actualizo el backend
        let productoActualizado = await productosService.actualizarProducto(id,producto)

        //actualizar producto en modelo local
        productosModel.actualizar(id,productoActualizado)

        //recargo la vista
        renderProds(productosModel.obtener())

        return productoActualizado
    }


    async borrarProducto(id) {
        //console.log('borrarProducto', id)

        //borro en el backend
        let productoBorrado = await productosService.borrarProducto(id)

        //borro producto en modelo local
        productosModel.borrar(id)

        //recargo la vista
        renderProds(productosModel.obtener())

        return productoBorrado
    }
}

const productosController = new ProductosController()