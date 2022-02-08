import dotenv from 'dotenv'

//dotenv.config() // lee desde el archivo default .env
dotenv.config({
    //path : 'miconfig.env'
    path : process.env.NODE_ENV + '.env'
}) // lee desde otro archivo

export default {
    PORT: process.env.PORT || 8080,
    TIPO_DE_PERSISTENCIA: process.env.TIPO_P || 'MONGODB', // 'MEM', 'FILE', 'MONGODB'
    STR_CNX: process.env.CNX || 'mongodb+srv://daniel:daniel123@misdatos.fs00f.mongodb.net/ecommerce3?retryWrites=true&w=majority'
}