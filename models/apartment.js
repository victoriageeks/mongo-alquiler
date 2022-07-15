const mongoose = require('mongoose');
const { Schema } = mongoose;

const apartmentSchema = new Schema({
    title: String,
    price: Number,
    meters: Number,
    photo: String,

});

// Creamos el modelo: relacionamos el esquema apartmentSchema a la colección 'apartments'
const Apartment = mongoose.model("apartments", apartmentSchema);

module.exports = Apartment;