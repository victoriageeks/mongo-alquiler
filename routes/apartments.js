var express = require('express');
var adminApartmentsController = require('../controllers/apartment');

var router = express.Router();

router.get("/", (req, res) => {
    res.send("Mostrar todos los apartamentos")
});

const checkAuth = (req, res, next) => {
    console.log(req.cookies);
    if (req.cookies.user == "admin") {
        console.log('The user is Admin')
        return next();
    }

    res.redirect("/login")

}

/* Ruta que muestra el formulario para añadir un nuevo apartmento */
/* La función checkAuth se va a encargar de comprobar si el usuario esta autentificado como administrador para poder acceder al controlador, y se debe colocar en cada una de las rutas que requieran autentificación */
router.get('/apartment/new-apartment', checkAuth, adminApartmentsController.getAddApartment);
router.post('/apartment/new-apartment', checkAuth, adminApartmentsController.postAddApartment);

module.exports = router;
