const bcrypt = require("bcryptjs");
const User = require("../models/user");


function register(req, res){
    const { firstname, lastName, email, password} = req.body;

    if(!email) res.status(400).send({msg: "El email es obligatorio"});
    if(!password) res.status(400).send({msg: "La contraseña es obligatoria"});

    const user = new User({
        firstname,
        lastName,
        email: email.toLowerCase(),
        role: "user",
        active: false
    });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;

    user.save((error, userDB) => {
        if(error) {
            res.status(400).send({msg: "Error al crear el usuario"});
        } else {
            res.status(200).send(userDB);
        }
    })
}

function login(req, res){
    const {email, password} = req.body;

    if(!email) res.status(400).send({msg: "El email es obligatorio:"});
    if(!password) res.status(400).send({msg: "La contraseña es obligatoria"});

    const emailLowerCase = email.toLowerCase();

    User.findOne({email: emailLowerCase}, (error, userStore) => {
        if(error){
            res.status(500).send({msg: "Error del servidor"});
        }else{
            bcrypt.compare(password, userStore.password, (bycryptError, check) => {
                if(bycryptError) {                
                res.status(500).send({msg: "Error del servidor"});
            }else if(!check) {
                res.status(500).send({msg: "Error del servidor"});
            } else if(!userStore.active) {
                res.status(401).send({msg: "Usuario no autorizado"});
            } else {
                res.status(200).send({msg: "Todo correcto"});
            }

            });
        }
    })
}


 
module.exports = {
    register,
    login,
};