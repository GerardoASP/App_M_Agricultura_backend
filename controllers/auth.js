const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("../utils/jwt");
const crypto = require('crypto');
const { transporter } = require("../config/emailService");


//registro de un usuario nuevo en el sistema
const register = async (req, res) => {
    const { 
            firstname, 
            lastname, 
            email:email, 
            password, 
            phone, 
            document_type, 
            document
        } = req.body;

    if (!email) return res.status(400).send({ msg: "El email es requerido "});
    if (!password) return res.status(400).send({ msg: "La contraseña es requerida "});
    if (!document) return res.status(400).send({ msg: "El documento es requerida "});

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    //const hashPassword = await bcrypt.hash(password,salt);
    const token = crypto.randomBytes(64).toString('hex');
    const generateRandomCode = () => Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const verifyCode = generateRandomCode();

    const user = new User({
        firstname,
        lastname,
        phone,
        document_type,
        document,
        email: email.toLowerCase(),
        password: hashPassword,
        active: true,
        verifyCode
    });

    try {
        const userStorage = await user.save();
        res.status(201).send(userStorage);
        let mailOptions = {
            from: process.env.EMAIL_MAILER,
            to: process.env.EMAIL_MAILER,
            subject: 'Verifica la cuenta del usuario',
            html: `El usuario ${user.firstname} ${user.lastname} con telefono ${user.phone}, se acaba de registrar en AmigoVillAgro. Revisa la aplicación para verificar la cuenta`
        };
        // Send the email
       transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    } catch (error) {
        res.status(400).send({ msg: "Error al crear el usuario", error: error.message || "Error desconocido" });
    }
};

const login = async (req, res) => {
    const {phone, password} = req.body;

    try {
        if (!password) {
            throw new Error("la contraseña es obligatoria");
        }
        if(!phone){
            throw new Error("El numero de telefono es obligatorio");
        }
        //const emailLowerCase = email.toLowerCase();
        const userStore = await User.findOne({ phone:phone}).exec();
        if (!userStore){
            throw new Error("El usuario no existe");
        }
        const check = await bcrypt.compare(password, userStore.password);
        if (!check){
            throw new Error("Contraseña incorrecta");
        }
        if (!userStore.active){
            throw new Error("Usuario no autorizado o no activo");
        }
        res.status(200).send({
            accessToken: jwt.createAccessToken(userStore),
            refreshToken: jwt.createRefreshToken(userStore),
            verifyCode: userStore.verifyCode,
        })
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
};

async function refreshAccessToken(req, res){
    const {token} = req.body;
    if (!token){
        return res.status(401).send({ msg: "Token requerido"});
    }
    try {
        const { user_id} = jwt.decoded(token);
        const userStorage = await User.findOne({_id: user_id});
        if (!userStorage) {
            return res.status(404).send({ msg: "Usuario no encontrado" });
        }
        const accessToken = jwt.createAccessToken(userStorage);
        return res.status(200).send({ accessToken });
    } catch (error) {
        console.error("Error del servidor: ", error);
        return res.status(500).send({ msg: "Error del servidor "});
    }
};

module.exports = {
    register,
    login,
    refreshAccessToken
};