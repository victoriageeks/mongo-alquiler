const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    checkIn: Date, //TODO: Añadir validaciones (required)
    checkOut: Date
});

const albumSchema = new Schema({
    main_p:{
        main_url:String,
        description_p1: String,
    },
    photo2:{
        url2:String,
        description_p2: String
    },
    photo3:{
        url3:String,
        description_p3: String
    },
    photo4:{
        url4:String,
        description_p4: String
    }
})

const apartmentSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    allowed:{
        smoke: Boolean,
        party: Boolean,
        pet: Boolean
    },
    rooms:{
        bedrooms: Number,
        beds: Number
    },
    toilets:{
        type:Number
    },
    album: albumSchema,
    price:{
        type:Number
    },
    guests:{
        type:Number
    },
    meters:{
        type:Number
    },
    services:{
        air_conditioning: Boolean,
        heating: Boolean,
        reduced_mobility_adapted: Boolean,
        tv: Boolean,
        kitchen: Boolean,
        internet: Boolean
    },
    location:{
        province:{
            type:String
        },
        city:{
            type:String
        },
        coordinates:{
            type:String
        }
    },
    bookings: [bookingSchema]
});

// Creamos el modelo: relacionamos el esquema apartmentSchema a la colección 'apartments'
const Apartment = mongoose.model("apartments", apartmentSchema);

module.exports = Apartment;