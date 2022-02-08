class ProductosModelMem {

    productos = []

    getNextId() {
        let id = 1
        try { id = Number(this.productos[this.productos.length-1].id) + 1 }
        catch {}

        return id.toString()
    }

    getIndex(productos, id) {
        return productos.findIndex( prod => prod.id === id )
    }

    /* -------- CRUD -> C : Create -------  */
    async createProducto(producto) {
        producto.id = this.getNextId()
        this.productos.push(producto)

        return producto
    }

    /* -------- CRUD -> R : Read one -------  */
    async readProducto(id) {
        let index = this.getIndex(this.productos,id)
        let producto = this.productos[index] || {}
        return producto 
    }

    /* -------- CRUD -> R : Read all -------  */
    async readProductos() {
        return this.productos
    }

    /* -------- CRUD -> U : Update one -------  */
    async updateProducto(id, producto) {
        producto.id = id
        let index = this.getIndex(this.productos,id)
        this.productos.splice(index,1,producto)

        return producto
    }

    /* -------- CRUD -> D : Delete one -------  */
    async deleteProducto(id) {
        let index = this.getIndex(this.productos,id)
        let producto = this.productos.splice(index,1)[0]

        return producto
    }
}

export default ProductosModelMem