class CarritoController {

    constructor() {
        try {
            carritoModel.inicializar( JSON.parse( localStorage.getItem('carrito') ) || [] )
        }
        catch {
            carritoModel.inicializar([])
            localStorage.setItem('carrito', carritoModel.obtener())
        }
    }

    agregarAlCarrito(producto) {

        if(!carritoModel.productoExiste(producto)) {
            producto.cantidad = 1
            carritoModel.guardar(producto)
        }
        else {
            let productoDeCarrito = carritoModel.obtenerProducto(producto)
            productoDeCarrito.cantidad++
        }

        localStorage.setItem('carrito', JSON.stringify(carritoModel.obtener()))
    }

    async borrarProducto(id) {
        console.log('borrarProducto', id)

        carritoModel.borrar(id)
        localStorage.setItem('carrito', JSON.stringify(carritoModel.obtener()))

        await renderCarrito(carritoModel.obtener())
    }

    async enviarCarrito() {
        var elemSectionCarrito = document.querySelector('.section-carrito')

        // ------ Envió el carrito al backend ------
        elemSectionCarrito.innerHTML = '<h2>Enviando carrito...</h2>'
        //console.log('Enviando carrito')
        await carritoService.guardarCarrito(carritoModel.obtener())
        //console.log('OK!')
        elemSectionCarrito.innerHTML = '<h2>Enviando carrito... <b>OK!</b></h2>'


        // ------ borro el carrito del modelo y del localstorage ------
        carritoModel.inicializar([])
        localStorage.setItem('carrito', carritoModel.obtener())

        // ------ cierro la ventana del menú del carrito un tiempo después ------
        setTimeout(() => {
            elemSectionCarrito.classList.remove('section-carrito--visible')
            mostrarCarrito = false
        },1500)
    }
}


const carritoController = new CarritoController()