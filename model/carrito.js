import CarritoModelMongoDB from "./carrito-mongodb.js"

class CarritoModel {
    static get(tipo) {
        switch(tipo) {
            case 'MONGODB':
                console.log('******* PERSISTENCIA EN MONGODB (carrito) *******')
                return new CarritoModelMongoDB()

            default:                 
                console.log('******* PERSISTENCIA DEFAULT (MONGODB) (carrito) *******')
                return new CarritoModelMongoDB()
        }
    }
}

export default CarritoModel