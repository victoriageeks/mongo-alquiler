const mongoose = require('mongoose');
const { Schema } = mongoose;
// MongoDB driver para acceder a la base de datos
// PROHIBIDO COPIAR MI URI
const uri = "mongodb+srv://root:root@cluster0.lo8dg.mongodb.net/mongorent?retryWrites=true&w=majority";

mongoose.connect(uri);

const apartmentSchema = new Schema({
    title: String,
    price: Number,
    meters: Number,
    photo: String,

});

// Creamos el modelo: relacionamos el esquema apartmentSchema a la colección 'apartments'
const Apartment = mongoose.model("apartments", apartmentSchema);

module.exports = Apartment;