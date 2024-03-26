const express = require('express');
const modelFarm = require('../models/farm');

/* CRUD */

/*Crear una finca en la base de datos*/
const createFarm = async (req, res)=>{
    try{
        const {nameFarm,lineFarm,area,predialValue,services,farmUser} = req.body;
        // console.log(req.body);
        const newFarm = new modelFarm({nameFarm,lineFarm,area,predialValue,services,farmUser});
        // console.log(newPost);
        const savedFarm = await newFarm.save();
        // res.status(201).json({message: "Post created"});
        return res.status(201).json(savedFarm);
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Listar todas los fincas */
const getFarms = async (req, res)=>{
    try{
        const farms = await modelFarm.find();
        return res.status(200).json(farms);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

/*Obtener información de una finca en especifico */
const getFarm = async (req, res) => {
    const id = req.params.id;
  
    try {
        const farm = await modelFarm.findById(id);
        if (!farm) {
            return res.status(404).json({ message: 'Farm not found' });
        }
        return res.status(200).json(farm);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/*Actualizar la información de una finca en la base de datos */
const updateFarm = async (req,res)=>{
    const { id } = req.params;
    const { nameFarm,lineFarm,area,predialValue,services,farmUser } = req.body;
    try {
      const farm = await modelFarm.findByIdAndUpdate(id, { nameFarm,lineFarm,area,predialValue,services,farmUser }, { new: true });
      return res.status(200).send(farm);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
}

/*Eliminar una finca en especifico */
const removeFarm = async(req, res)=>{
    try{
        const {id} = req.params;
        const farmDelete = await modelFarm.findByIdAndDelete(id)
        if(farmDelete === null) {
            return res.status(404).json({message: "Farm not found"});
        }
        return res.status(204).json();
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Zona Exportación de Funciones */

module.exports = {
    createFarm,
    getFarms,
    getFarm,
    updateFarm,
    removeFarm
}