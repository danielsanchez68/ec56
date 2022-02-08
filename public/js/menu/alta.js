let inputs = null
let form = null
let button = null

/* --------------- drag and drop ------------------- */
let imagenSubida = ''
let dropArea = null
let progressBar = null

const regExpValidar = [
    /^.+$/, // regexp nombre
    /^[0-9]+$/, // regexp precio
    /^[0-9]+$/, // regexp stock
    /^.+$/, // regexp marca
    /^.+$/, // regexp categoría
    /^.+$/, // regexp detalles
    ///^.+$/  // regexp foto
]

const camposValidos = [ false, false, false, false, false, false]//, false ]
const algunCampoNoValido = () => {
    let valido = 
        camposValidos[0] &&
        camposValidos[1] &&
        camposValidos[2] &&
        camposValidos[3] &&
        camposValidos[4] &&
        camposValidos[5]/*  &&
        camposValidos[6] */

    return !valido        
}



const setCustomValidity = function (mensaje, index) {
    const errorDivs = document.querySelectorAll('div.error-detail')
    errorDivs[index].innerHTML = mensaje
    errorDivs[index].parentNode.classList.toggle('input-group--error', !!mensaje)
}

function validar(valor, validador, index) {

    if (!validador.test(valor)) {
        setCustomValidity('Este campo no es válido', index)
        camposValidos[index] = false
        button.disabled = true
        return null
    }

    camposValidos[index] = true
    button.disabled = algunCampoNoValido()
    setCustomValidity('', index)
    return valor
}


function renderProds(productos) {

    fetch('vistas/alta.hbs')
    .then(r => r.text())
    .then( plantilla => {
        // compile the template
        var template = Handlebars.compile(plantilla);
        // execute the compiled template and print the output to the console
        let html = template({ productos: productos });

        document.querySelector('.listado-productos').innerHTML = html
    })
}

function leerProductoIngresado() {
    return {
        nombre: inputs[0].value,
        precio: inputs[1].value,
        stock: inputs[2].value,
        marca: inputs[3].value,
        categoria: inputs[4].value,
        detalles: inputs[5].value,
        /* --------------- drag and drop ------------------- */
        foto: imagenSubida? `/uploads/${imagenSubida}` : '',//inputs[6].value,
        // envio: inputs[7].value,
        envio: inputs[6].checked //envio: inputs[7].checked,
    }
}

function limpiarFormulario() {
    // inicializo los campos del formulario
    inputs.forEach(input => {
        input.type == 'checkbox'? input.checked = false : input.value = ''
    })

    button.disabled = true
    for(let i=0; i<camposValidos.length; i++) {
        camposValidos[i] = false
    }

    /* --------------- drag and drop ------------------- */
    let img = document.querySelector('#gallery img')
    img.src = ''

    initializeProgress()
    imagenSubida = ''    
}

/* --------------- drag and drop ------------------- */
function initializeProgress() {
    progressBar.value = 0
}

function updateProgress(porcentaje) {
    progressBar.value = porcentaje
}

function previewFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function() {
        let img = document.querySelector('#gallery img')
        img.src = reader.result
    }
}

function handleFiles(files) {
    let file = files[0]
    initializeProgress()
    uploadFile(file)
    previewFile(file)
}

function uploadFile(file) {
    var url = '/upload'

    var xhr = new XMLHttpRequest()
    var formdata = new FormData()

    xhr.open('POST', url)

    xhr.upload.addEventListener('progress', e => {
        let porcentaje = (((e.loaded * 100.0) / e.total) || 100)
        updateProgress(porcentaje)
    })

    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            imagenSubida = JSON.parse(xhr.response).nombre
        }
    })

    formdata.append('foto', file)
    xhr.send(formdata)
}
/* ------------------------------------------------- */


async function initAlta() {
    console.warn('initAlta')

    inputs = document.querySelectorAll('.alta-form .input-group input')
    //console.log(inputs)
    form = document.querySelector('.alta-form')
    button = document.querySelector('button')
    
    button.disabled = true

    productosModel.inicializar(await productosController.obtenerProductos())
    renderProds(productosModel.obtener())

    inputs.forEach((input, index) => {
        if(input.type != 'checkbox') {
            input.addEventListener('input', () => {
                validar(input.value, regExpValidar[index], index)
            })
        }
    })
    
    form.addEventListener('submit', async e => {
        e.preventDefault()
    
        let producto = leerProductoIngresado()
        limpiarFormulario()

        await productosController.guardarProducto(producto)
    })

    /* --------------- drag and drop ------------------- */
    dropArea = document.getElementById('drop-area')
    progressBar = document.getElementById('progress-bar')

    //Para cancelar el evento automática de drag and drop
    ;['dragenter','dragover','dragleave','drop'].forEach( eventName => {
        dropArea.addEventListener(eventName, e => e.preventDefault())
        document.body.addEventListener(eventName, e => e.preventDefault())
    })

    //Para remarcar la zona de drop al arrastrar una imagen dentro de ella
    ;['dragenter','dragover'].forEach( eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.add('highlight')
        })
    })

    //Para desmarcar la zona de drop al abandonar la zona de drop
    ;['dragleave','drop'].forEach( eventName => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.remove('highlight')
        })
    })

    dropArea.addEventListener('drop', e => {
        var dt = e.dataTransfer
        var files = dt.files

        handleFiles(files)
    })
}