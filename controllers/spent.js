const express = require('express');
const modelSpent = require('../models/spent');
const modelLot = require('../models/lot');
const modelProduct = require('../models/product');

/* CRUD */

/*Crear un gasto en la base de datos*/
const createSpentForLot = async (req, res)=>{
    try{
        const {nameSpent,valueSpent,dateSpent,spentLot,spentProduct} = req.body;
        // console.log(req.body);
        const newSpent = new modelSpent({nameSpent,valueSpent,dateSpent,spentLot,spentProduct});
        // console.log(newPost);
        const savedSpent = await newSpent.save();

        // Recupera el usuario al que deseas agregar el post
        const lot = await modelLot.findById(spentLot);

        if(spentLot != ""){
            // Agrega el ObjectId del nuevo gasto al array correspondiente
            lot.lotSpents.push(savedSpent._id);
        
            // Guarda el lote
            await lot.save();
        }

        // res.status(201).json({message: "Post created"});
        return res.status(201).json(savedSpent);
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

const createSpentForProduct = async (req, res)=>{
    try{
        const {nameSpent,valueSpent,dateSpent,spentLot,spentProduct} = req.body;
        // console.log(req.body);
        const newSpent = new modelSpent({nameSpent,valueSpent,dateSpent,spentLot,spentProduct});
        // console.log(newPost);
        const savedSpent = await newSpent.save();

        // Recupera el usuario al que deseas agregar el post
        const product = await modelProduct.findById(spentProduct);

        if(spentProduct != ""){
            // Agrega el ObjectId del nuevo gasto al array correspondiente
            product.productSpents.push(savedSpent._id);
        
            // Guarda el lote
            await product.save();
        }

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
const removeSpentForLot = async(req, res)=>{
    const lotId = req.body.lotId;
    try{
        const {id} = req.params;
        const spentDelete = await modelSpent.findByIdAndDelete(id);

        // Encuentra el usuario al que deseas agregar el post
        const lot = await modelLot.findById(lotId);
        
        // Elimina el post del array 'posts' del usuario
        lot.lotSpents.pull(id);
        await lot.save();

        if(spentDelete === null) {
            return res.status(404).json({message: "Spent not found"});
        }
        return res.status(204).json();
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Eliminar un gasto en especifico de la base de datos */
const removeSpentForProduct = async(req, res)=>{
    const productId = req.body.productId;
    try{
        const {id} = req.params;
        const spentDelete = await modelSpent.findByIdAndDelete(id);

        // Encuentra el usuario al que deseas agregar el post
        const product = await modelProduct.findById(productId);
        console.log(product)
        
        // Elimina el post del array 'posts' del usuario
        product.productSpents.pull(id);
        await product.save();

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
    createSpentForLot,
    createSpentForProduct,
    getSpents,
    getSpent,
    updateSpent,
    removeSpentForLot,
    removeSpentForProduct
}