const express = require('express');
const modelUser = require('../models/user');
const modelPublication = require('../models/publication');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
/* CRUD */

/*Crear un gasto en la base de datos*/
const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password, document_type, document,publications } = req.body;

        // Generar un hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new modelUser({
            firstname,
            lastname,
            email,
            phone,
            password: hashedPassword, // Guardar la contraseña cifrada
            document_type,
            document,
            publications
        });

        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

/*Listar todos los gastos */
const getUsers = async (req, res)=>{
    try{
        const users = await modelUser.find();
        return res.status(200).json(users);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

/*Obtener información de un gasto en especifico */
const getUser = async (req, res) => {
    const id = req.params.id;
  
    try {
        const user = await modelUser.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/*Actualizar la información de un gasto en la base de datos */
const updateUser = async (req,res)=>{
    const { id } = req.params;
    const { firstname,lastname,email,phone,password,document_type,document,publications } = req.body;
    try {
      const user = await modelUser.findByIdAndUpdate(id, { firstname,lastname,email,phone,password,document_type,document,publications }, { new: true });
      return res.status(200).send(user);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
}

/*Eliminar un gasto en especifico de la base de datos */
const removeUser = async(req, res)=>{
    try{
        const {id} = req.params;
        const userDelete = await modelUser.findByIdAndDelete(id)
        if(userDelete === null) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(204).json();
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Obtener un usuario en especifico por el codigo de verificacion*/
const getUserByVerifyCode = async (req, res) => {
    const importantCode = req.params.verifyCode;
    try {
      const user = await modelUser.findOne({ verifyCode: importantCode });
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

const getPublicationsOfUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscamos el usuario en la base de datos utilizando su ID
    const user = await modelUser.findById(id);

    // Verificamos si el usuario existe
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Obtenemos los IDs de los proyectos asociados al usuario
    const publicationIds = user.userPublications.map(id => new mongoose.Types.ObjectId(id));
    //console.log(publicationIds)

    // Verificamos que haya IDs de publicaciones
    if (!publicationIds || publicationIds.length === 0) {
      return res.status(404).json({ message: "No publications found for this user" });
    }

    // Buscamos los proyectos en la base de datos utilizando los IDs
    const publications = await modelPublication.find({ _id: { $in: publicationIds } });

    //console.log("Publications found:", publications);
    // Verificamos si se encontraron publicaciones
    if (!publications || publications.length === 0) {
      return res.status(404).json({ message: "No publications found for the given IDs" });
    }

    // Retornamos las publicaciones encontradas
    res.status(200).json(publications);
  } catch (error) {
    // Manejamos errores
    console.error("Error fetching user publications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/*Zona Exportación de Funciones */

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    removeUser,
    getUserByVerifyCode,
    getPublicationsOfUser
}