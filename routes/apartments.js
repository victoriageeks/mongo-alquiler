var express = require('express');
var apartmentsController = require('../controllers/apartment');

var router = express.Router();


// Esta función se encarga de permitir, o no, el paso de la petición del cliente en función de si esta autentificado o no
const checkAuth = (req, res, next) => {
    //aquí es la contraseña del login, entonces genera una cookie de tipo admin, cuando se logguee correctamente, hace el return next que permite ejecutar la función get add-apartment
    if (req.cookies.user == "admin") {
        return next();
    }

    res.redirect("/login")

}

router.get("/", apartmentsController.getAllApartments);
router.get("/search", apartmentsController.getFilteredApartments);

/* Ruta que muestra el formulario para añadir un nuevo apartmento */
/* La función checkAuth se va a encargar de comprobar si el usuario esta autentificado como administrador para poder acceder al controlador, y se debe colocar en cada una de las rutas que requieran autentificación */
router.get('/new-apartment', checkAuth, apartmentsController.getAddApartment);
router.post('/new-apartment', checkAuth, apartmentsController.postAddApartment);

router.get('/:id/edit', checkAuth, apartmentsController.getEditApartment);
router.post('/:id/edit', checkAuth, apartmentsController.postEditApartment);

router.post('/:id/book', apartmentsController.postBookApartment);

// ruta detalle del apartamento
router.get('/:id', apartmentsController.getApartmentDetail)

module.exports = router;
