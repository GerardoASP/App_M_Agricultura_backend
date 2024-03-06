const express = require('express');
const modelSpent = require('../models/spent');

/* CRUD */

/*Crear un gasto en la base de datos*/
const createSpent = async (req, res)=>{
    try{
        const {nameSpent,valueSpent,dateSpent,spentLot,spentProduct} = req.body;
        // console.log(req.body);
        const newSpent = new modelSpent({nameSpent,valueSpent,dateSpent,spentLot,spentProduct});
        // console.log(newPost);
        const savedSpent = await newSpent.save();
        // res.status(201).json({message: "Post created"});
        return res.status(201).json(savedSpent);
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Listar todos los gastos */
const getSpents = async (req, res)=>{
    try{
        const spents = await modelSpent.find();
        return res.status(200).json(spents);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

/*Obtener información de un gasto en especifico */
const getSpent = async (req, res) => {
    const id = req.params.id;
  
    try {
        const spent = await modelSpent.findById(id);
        if (!spent) {
            return res.status(404).json({ message: 'Spent not found' });
        }
        return res.status(200).json(spent);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/*Actualizar la información de un gasto en la base de datos */
const updateSpent = async (req,res)=>{
    const { id } = req.params;
    const { nameSpent,valueSpent,dateSpent,spentLot,spentProduct } = req.body;
    try {
      const spent = await modelSpent.findByIdAndUpdate(id, { nameSpent,valueSpent,dateSpent,spentLot,spentProduct }, { new: true });
      return res.status(200).send(spent);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
}

/*Eliminar un gasto en especifico de la base de datos */
const removeSpent = async(req, res)=>{
    try{
        const {id} = req.params;
        const spentDelete = await modelSpent.findByIdAndDelete(id)
        if(spentDelete === null) {
            return res.status(404).json({message: "Spent not found"});
        }
        return res.status(204).json();
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Zona Exportación de Funciones */

module.exports = {
    createSpent,
    getSpents,
    getSpent,
    updateSpent,
    removeSpent
}