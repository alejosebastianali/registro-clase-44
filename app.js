const express = require('express');
const app = express();
const helmet = require('helmet');
const { body, validationResult } = require('express-validator'); //deconstructor
const rateLimit = require('express-rate-limit');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet())

const usuarios = [
    {
        usuario: "ana",
        contrasena: "1234",
        email: "maru@hotmail.com"
    },
    {
        usuario: "fran",
        contrasena: "9876"
    },
    {
        usuario: "richard",
        contrasena: "5676"
    },
    {
        usuario: "maru",
        contrasena: "5386"
    },
]

//MIDDLEWARE BUSQUEDA POR USUARIO 
// var existeUsuario = (req, res, next) => {
//     let buscaUsuario = usuarios.find(element => {
//         return element.email == req.body.email
//     });
//     if (buscaUsuario == undefined) {
//         return res.status(401).json({
//             message: "El usuario no se ha registrado"
//         })
//     }
//     return next();
// }

const validatorLogin = [
    body("email")
        .isEmail()
        .withMessage("Debe ser un formato email")
        .notEmpty()
        .withMessage("El campo no puede estar vacio"),
    body("password")
        .isString()
        .withMessage("Debe ser un string")
        .notEmpty()
        .withMessage("El campo no puede estar vacio")
];

//ENDPOINT LOGIN
app.post('/login', validatorLogin, function (req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: errors.array() })
    }
    //VALIDA QUE EL USUARIO EXISTA EN EL ARRAY
    let buscaUsuario = usuarios.find(element => {
        return element.email == req.body.email
    });
    if (buscaUsuario == undefined) {
        return res.status(401).json({
            message: "El usuario no existe"
        })
    }
        let login = usuarios.find(element => {
        //VALIDA QUE COINCIDA EMAIL Y CONTRASE;A
        return element.email == req.body.email && element.contrasena == req.body.password
    });
    if (login) {
        return res.status(200).json({ message: "El Usuario ha ingresado" })
    }
    else {
        return res.status(401).json({ message: "Usuario o Contrasena Incorrecta" })
    }
});



app.listen(3000, function () {
    console.log('Server on port 3000')
})