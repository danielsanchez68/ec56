import express  from 'express'
import controller from '../controller/productos.js'

const router = express.Router()


/* ------------------------ RUTAS GET -------------------------- */
router.get('/:id?', controller.getProductos)

/* ------------------------ RUTAS POST -------------------------- */
router.post('/', controller.postProducto)

/* ------------------------ RUTAS PUT -------------------------- */
router.put('/:id', controller.putProducto)

/* ------------------------ RUTAS DELETE -------------------------- */
router.delete('/:id', controller.deleteProducto)


export default router


