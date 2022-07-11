const Apartment = require('../models/apartment');

const getAddApartment = (req, res) => {
    res.render('add-apartment');
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
    const { title, meters, photo, price } = req.body;

    // 2. Insertar el apartmento en la base de datos
    const apartment = new Apartment({
        title,
        meters,
        photo,
        price
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
    // const document = await modelApartments.getApartmentById(id);

    // // 3. Renderizar el formulario pero ahora se deben rellenar los campos con los valores del documento
    // // TODO: En add-apartment.ejs comprobar si la variable document tiene valor. En tal caso, rellenar cada uno de los campos del formularo con los datos del objeto. 
    // res.render("add-apartment", {
    //     document
    // })
}

module.exports = {
    getAddApartment,
    getAllApartments,
    postAddApartment,
    getEditApartment
}