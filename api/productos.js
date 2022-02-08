import config from '../config.js'

//import ProductosModelMem from "../model/productos-mem.js"
//import ProductosModelFile from "../model/productos-file.js"
//import ProductosModelMongoDB from '../model/productos-mongodb.js'
import ProductosModel from '../model/productos.js'

//const model = new ProductosModelMem()
//const model = new ProductosModelFile()
//const model = new ProductosModelMongoDB()

const model = ProductosModel.get(config.TIPO_DE_PERSISTENCIA)


const obtenerProductos = async () => {
    let productos = await model.readProductos()
    return productos
}

const obtenerProducto = async id => {
    let producto = await model.readProducto(id)
    return producto
}

const guardarProducto = async producto => {
    let productoGuardado = await model.createProducto(producto)
    return productoGuardado
}

const actualizarProducto = async (id,producto) => {
    let productoActualizado = await model.updateProducto(id,producto)
    return productoActualizado
}

const borrarProducto = async id => {
    let productoBorrado = await model.deleteProducto(id)
    return productoBorrado
}


export default {
    obtenerProductos,
    obtenerProducto,
    guardarProducto,
    actualizarProducto,
    borrarProducto
}