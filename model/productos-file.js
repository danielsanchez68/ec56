import fs from 'fs'


class ProductosModelFile {

    nombreArchivo = 'productos.dat'

    getNextId(productos) {
        let id = 1
        try { id = Number(productos[productos.length-1].id) + 1 }
        catch {}

        return id.toString()
    }

    getIndex(productos, id) {
        return productos.findIndex( prod => prod.id === id )
    }

    async leerArchivo() {
        try {
            let productos = JSON.parse(await fs.promises.readFile(this.nombreArchivo,'utf-8'))
            return productos
        }
        catch(error) {
            console.log(error.message)
            return []
        }
    }

    async guardarArchivo(productos) {
        await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(productos,null,'\t'))
    }


    /* -------- CRUD -> C : Create -------  */
    async createProducto(producto) {
        let productos = await this.leerArchivo()

        producto.id = this.getNextId(productos)
        productos.push(producto)

        await this.guardarArchivo(productos)

        return producto
    }

    /* -------- CRUD -> R : Read one -------  */
    async readProducto(id) {
        let productos = await this.leerArchivo()

        let index = this.getIndex(productos,id)
        let producto = productos[index] || {}
        return producto 
    }

    /* -------- CRUD -> R : Read all -------  */
    async readProductos() {
        let productos = await this.leerArchivo()
        return productos
    }

    /* -------- CRUD -> U : Update one -------  */
    async updateProducto(id, producto) {
        let productos = await this.leerArchivo()

        producto.id = id
        let index = this.getIndex(productos,id)
        productos.splice(index,1,producto)

        await this.guardarArchivo(productos)

        return producto
    }

    /* -------- CRUD -> D : Delete one -------  */
    async deleteProducto(id) {
        let productos = await this.leerArchivo()

        let index = this.getIndex(productos,id)
        let producto = productos.splice(index,1)[0]

        await this.guardarArchivo(productos)

        return producto
    }
}

export default ProductosModelFile