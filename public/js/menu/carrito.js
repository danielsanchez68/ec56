let mostrarCarrito = false

async function renderCarrito(carrito) {
    let plantilla = await fetch('vistas/carrito.hbs').then(r => r.text())
    // compile the template
    var template = Handlebars.compile(plantilla);
    // execute the compiled template and print the output to the console
    let html = template({ carrito: carrito });

    document.querySelector('.section-carrito').innerHTML = html
}

function initCarrito() {
    var btnCarrito = document.querySelector('.search-bar__carrito-container')
    var elemSectionCarrito = document.querySelector('.section-carrito')

    btnCarrito.addEventListener('click', async () => {
        mostrarCarrito = !mostrarCarrito
        if(mostrarCarrito) {
            await renderCarrito(carritoModel.obtener())
            elemSectionCarrito.classList.add('section-carrito--visible')
        }
        else {
            elemSectionCarrito.classList.remove('section-carrito--visible')
        }
    })
}

initCarrito()