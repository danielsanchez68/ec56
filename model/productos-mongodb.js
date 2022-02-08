import mongoose from 'mongoose'
import DB_Mongo from '../model/DB_Mongo.js'

//----------------------------------------------------
// Esquema del documento producto
const productoSchema = mongoose.Schema({
    nombre : String,
    precio: Number,
    stock: Number,
    marca: String,
    categoria: String,
    detalles: String,
    foto: String,
    envio: Boolean,
})

//Modelo del documento almacenado en una colección
const ProductoModel = mongoose.model('productos', productoSchema)


class ProductoModelMongoDB {
    /* -------- CRUD -> C : Create -------  */
    async createProducto(producto) {
        if(!DB_Mongo.conexionOk) return {}
        
        try {
            const productoSave = new ProductoModel(producto)
            await productoSave.save()

            let productos = await ProductoModel.find({}).lean()
            let productosGuardado = productos[productos.length-1]

            return DB_Mongo.genIdKey(productosGuardado)
        }
        catch(error) {
            console.log(`Error en createProducto: ${error.message}`)
            return {}
        }
    }

    /* -------- CRUD -> R : Read one -------  */
    async readProducto(id) {
        if(!DB_Mongo.conexionOk) return {}

        try {
            let producto = await ProductoModel.findOne({_id:id}).lean()
            //console.log(producto)
            return DB_Mongo.genIdKey(producto)
        }
        catch(error) {
            console.log(`Error en readProducto: ${error.message}`)
            return {}
        }
    }

    /* -------- CRUD -> R : Read all -------  */
    async readProductos() {
        if(!DB_Mongo.conexionOk) return []

        try {
            let productos = await ProductoModel.find({}).lean()
            //console.log(productos)
            return DB_Mongo.genIdKey(productos)
        }
        catch(error) {
            console.log(`Error en readProductos: ${error.message}`)
            return {}
        }
    }

    /* -------- CRUD -> U : Update one -------  */
    async updateProducto(id, producto) {
        if(!DB_Mongo.conexionOk) return {}

        try {
            await ProductoModel.updateOne({_id:id},{$set:producto})
            
            let productoActualizado = await ProductoModel.findOne({_id:id}).lean()

            return DB_Mongo.genIdKey(productoActualizado)
        }
        catch(error) {
            console.log(`Error en updateProducto: ${error.message}`)
            return {}
        }   

    }

    /* -------- CRUD -> D : Delete one -------  */
    async deleteProducto(id) {
        if(!DB_Mongo.conexionOk) return {}

        try {

            let productoBorrado = await ProductoModel.findOne({_id:id}).lean()
            await ProductoModel.deleteOne({_id:id})

            return DB_Mongo.genIdKey(productoBorrado)
        }
        catch(error) {
            console.log(`Error en updateProducto: ${error.message}`)
            return {}
        } 
    }
}

export default ProductoModelMongoDB