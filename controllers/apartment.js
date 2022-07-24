const Apartment = require('../models/apartment');

const getAddApartment = (req, res) => {
    res.render('add-apartment', {
        document: {}
    });
}

const getAllApartments = async (req, res) => {

    // 1. El controlador debe ir al modelo y obtener todos los apartamentos que existen en la base de datos. Además, los ordenamos por precio de forma creciente
    const apartments = await Apartment.find().sort({
        price: 1
    });

    res.render('index', {
        apartments
    });
}

const postAddApartment = async (req, res) => {
    // 1. Recuperar los campos del formulario
    const {title,
        description,
        smoke,
        party,
        pet,
        bedrooms,
        beds,
        toilets,
        main_url,
        description_p1,
        url2,
        description_p2,
        url3,
        description_p3,
        url4,
        description_p4,
        price,
        guests,
        meters,
        air_conditioning,
        heating,
        reduced_mobility_adapted,
        tv,
        kitchen,
        internet,
        province,
        city,
        coordinates} = req.body;

    // 2. Insertar el apartmento en la base de datos
    const apartment = new Apartment({
        title,
        description,
        allowed:{
            smoke,
            party,
            pet
        },
        rooms:{
            bedrooms,
            beds
        },
        toilets,
        album:{
            main_p:{
                main_url,
                description_p1
            },
            photo2:{
                url2,
                description_p2
            },
            photo3:{
                url3,
                description_p3
            },
            photo4:{
                url4,
                description_p4
            }
        },
        price,
        guests,
        meters,
        services:{
            air_conditioning,
            heating,
            reduced_mobility_adapted,
            tv,
            kitchen,
            internet
        },
        location:{
            province,
            city,
            coordinates
        }
    });

    // 2.5: Salvamos el documento en la base de datos
    await apartment.save();

    // 3. Devolver el control al cliente
    res.redirect('/');
}

const getEditApartment = async (req, res) => {
    // 1. Recuperar el apartamento que se quiere editar
    const { id } = req.params;
    // 2. Ir a MongoDB y traerte el documento identificado con ese ID
    const document = await Apartment.findById(id);

    // // 3. Renderizar el formulario pero ahora se deben rellenar los campos con los valores del documento

    res.render("add-apartment", {
        document
    });
}

const getApartmentDetail = async (req, res) => {
    // 1. Consultar al Modelo el apartamento identificado por el id que nos pasa en la petición GET. req.params.id
    const { id } = req.params; // const id = req.params.id;
    const document = await Apartment.findById(id);

    // 2. Renderizar la vista con el documento recuperado
    res.render('apartment', {
        document
    });
}

const getFilteredApartments = async (req, res) => {
    // 1. Recuperar los filtros de la petición GET
    const { price } = req.query;

    // 2. Ir al modelo y filtrar los apartamentos que coincidan con los filtros
    const apartments = await Apartment.find({
        price: {
            $lte: price // "less than equal", el precio se encuentra en el rango de 0 a price
        }
    });

    // 3. Renderizar la vista con los apartamentos filtrados
    res.render('index', {
        apartments
    });
}

const postEditApartment = async (req, res) => {
    // 1. Recuperar los campos del formulario
    const { id } = req.params;
    const {title,
        description,
        smoke,
        party,
        pet,
        bedrooms,
        beds,
        toilets,
        main_url,
        description_p1,
        url2,
        description_p2,
        url3,
        description_p3,
        url4,
        description_p4,
        price,
        guests,
        meters,
        air_conditioning,
        heating,
        reduced_mobility_adapted,
        tv,
        kitchen,
        internet,
        province,
        city,
        coordinates
        } = req.body;

    // 2. Actualizar el apartamento en la base de datos
    await Apartment.findByIdAndUpdate(id, {
        title,
        description,
        allowed:{
            smoke,
            party,
            pet
        },
        rooms:{
            bedrooms,
            beds
        },
        toilets,
        album:{
            main_p:{
                main_url,
                description_p1
            },
            photo2:{
                url2,
                description_p2
            },
            photo3:{
                url3,
                description_p3
            },
            photo4:{
                url4,
                description_p4
            }
        },
        price,
        guests,
        meters,
        services:{
            air_conditioning,
            heating,
            reduced_mobility_adapted,
            tv,
            kitchen,
            internet
        },
        location:{
            province,
            city,
            coordinates
        }
    });

    // 3. Redireccionar al apartamento editado
    res.redirect(`/apartment/${id}`);
}

const postBookApartment = async (req, res) => {

    // TODO

    // 1. Actualizar el apartamento y añadirle la nueva reserva. Tiene que suceder que a medida que añado reservas, el campo booking va 'creciendo', con nuevas reservas

    // 2. Además, mirar si las fechas seleccionadas por el usuario estan libres para este apartmento. En tal caso, devolver un mensaje de error.
    res.send(`Apartamento ${req.params.id} reservado.`);
}

module.exports = {
    getAddApartment,
    getAllApartments,
    postAddApartment,
    getEditApartment,
    getApartmentDetail,
    getFilteredApartments,
    postEditApartment,
    postBookApartment
}