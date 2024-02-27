const express = require('express');
const modelLot = require('../models/lot');

/* CRUD */

/*Crear un lote en la base de datos*/
const createLot = async (req, res)=>{
    try{
        const {lotType,area,lotFarm,lotProducts} = req.body;
        // console.log(req.body);
        const newLot = new modelLot({lotType,area,lotFarm,lotProducts});
        // console.log(newPost);
        const savedLot = await newLot.save();
        // res.status(201).json({message: "Post created"});
        return res.status(201).json(savedLot);
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Listar todos los lotes */
const getLots = async (req, res)=>{
    try{
        const lots = await modelLot.find();
        return res.status(200).json(lots);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

/*Obtener información de un lote en especifico */
const getLot = async (req, res) => {
    const id = req.params.id;
  
    try {
        const lot = await modelLot.findById(id);
        if (!lot) {
            return res.status(404).json({ message: 'Lot not found' });
        }
        res.status(200).json(lot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/*Actualizar la información de un lote en la base de datos */
const updateLot = async (req,res)=>{
    const { id } = req.params;
    const { lotType,area,lotFarm,lotProducts } = req.body;
    try {
      const lot = await modelLot.findByIdAndUpdate(id, { lotType,area,lotFarm,lotProducts }, { new: true });
      return res.status(200).send(lot);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
}

/*Eliminar un lote en especifico de la base de datos */
const removeLot = async(req, res)=>{
    try{
        const {id} = req.params;
        const lotDelete = await modelLot.findByIdAndDelete(id)
        if(lotDelete === null) {
            return res.status(404).json({message: "Lot not found"});
        }
        return res.status(204).json();
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Zona Exportación de Funciones */

module.exports = {
    createLot,
    getLots,
    getLot,
    updateLot,
    removeLot
}