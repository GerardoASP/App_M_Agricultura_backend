const express = require('express');
const modelUser = require('../models/user');

/* CRUD */

/*Crear un gasto en la base de datos*/
const createUser = async (req, res)=>{
    try{
        const {firstname,lastname,email,phone,password,document_type,document} = req.body;
        // console.log(req.body);
        const newUser = new modelUser({firstname,lastname,email,phone,password,document_type,document});
        // console.log(newPost);
        const savedUser = await newUser.save();
        // res.status(201).json({message: "Post created"});
        return res.status(201).json(savedUser);
    }catch(error){
        return res.status(400).json({message: error.message});
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
    const { firstname,lastname,email,phone,password,document_type,document } = req.body;
    try {
      const user = await modelUser.findByIdAndUpdate(id, { firstname,lastname,email,phone,password,document_type,document }, { new: true });
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

/*Zona Exportación de Funciones */

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    removeUser
}