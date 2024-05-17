const express = require('express');
const modelFarm = require('../models/farm');
const modelUser = require('../models/user');
const modelLot = require('../models/lot');

/* CRUD */

/*Crear una finca en la base de datos*/
const createFarm = async (req, res)=>{
    try{
        const {nameFarm,lineFarm,area,predialValue,services,farmUser,farmLots} = req.body;
        // console.log(req.body);
        const newFarm = new modelFarm({nameFarm,lineFarm,area,predialValue,services,farmUser,farmLots});
        // console.log(newPost);
        const savedFarm = await newFarm.save();

        // Recupera el usuario al que deseas agregar el post
        const user = await modelUser.findById(farmUser);
        
        // Agrega el ObjectId del nuevo post al array correspondiente
        user.userFarms.push(savedFarm._id);
        
        // Guarda el usuario
        await user.save();
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
    const { nameFarm,lineFarm,area,predialValue,services,farmUser,farmLots } = req.body;
    try {
      const farm = await modelFarm.findByIdAndUpdate(id, { nameFarm,lineFarm,area,predialValue,services,farmUser,farmLots }, { new: true });
      return res.status(200).send(farm);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
}

/*Eliminar una finca en especifico */
const removeFarm = async(req, res)=>{
    const userId = req.body.userId;
    try{
        
        const {id} = req.params;
        const farmDelete = await modelFarm.findByIdAndDelete(id)
        // Encuentra el usuario al que deseas agregar el post
        const user = await modelUser.findById(userId);
        console.log(user)
        // Elimina el post del array 'posts' del usuario
        user.userFarms.pull(id);
        await user.save();
        
        if(farmDelete === null) {
            return res.status(404).json({message: "Farm not found"});
        }
        return res.status(204).json();
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

// Listar los usuarios de una finca
const getUserOfFarm = async (req, res) => {
    try {
        // Obtenemos el ID del proyecto de los parámetros de la solicitud
        const { id } = req.params;
  
        // Buscamos la finca en la base de datos utilizando su ID
        const farm = await modelFarm.findById(id);
  
        // Verificamos si la finca existe
        if (!farm) {
            return res.status(404).json({ message: "farm not found" });
        }
  
        // Obtenemos el ID del usuario  asociado a la finca
        const userIds = farm.farmUser;
  
        // Buscamos los usuarios en la base de datos utilizando sus IDs
        const searchUser = await modelUser.find({ _id: { $in: userIds } });
  
        // Retornamos el usuario asociado a la finca
        res.status(200).json(searchUser);
    } catch (error) {
        // Manejamos errores
        res.status(500).json({ message: error.message });
    }
  }

  // Listar los lotes de una finca
  const getLotsOfFarm = async (req, res) => {
    try {
        // Obtenemos el ID del proyecto de los parámetros de la solicitud
        const { id } = req.params;
  
        // Buscamos la finca en la base de datos utilizando su ID
        const farm = await modelFarm.findById(id);
  
        // Verificamos si la finca existe
        if (!farm) {
            return res.status(404).json({ message: "farm not found" });
        }
  
        // Obtenemos los IDs de los lotes asociados a la finca 
        const lotsIds = farm.farmLots;
  
        // Buscamos los lotes en la base de datos utilizando sus IDs
        const lots = await modelLot.find({ _id: { $in: lotsIds } });
  
        // Retornamos la lista de lotes asociados a la finca
        res.status(200).json(lots);
    } catch (error) {
        // Manejamos errores
        res.status(500).json({ message: error.message });
    }
  }

/*Zona Exportación de Funciones */

module.exports = {
    createFarm,
    getFarms,
    getFarm,
    updateFarm,
    removeFarm,
    getUserOfFarm,
    getLotsOfFarm
}