const express = require('express');
const modelSale = require('../models/sale');

/* CRUD */

/*Crear una venta en la base de datos*/
const createSale = async (req, res)=>{
    try{
        const {nameSale,valueSale,dateSale,saleProducts} = req.body;
        // console.log(req.body);
        const newSale = new modelSale({nameSale,valueSale,dateSale,saleProducts});
        // console.log(newPost);
        const savedSale = await newSale.save();
        // res.status(201).json({message: "Post created"});
        return res.status(201).json(savedSale);
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Listar todas las ventas con su información */
const getSales = async (req, res)=>{
    try{
        const sales = await modelSale.find();
        return res.status(200).json(sales);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

/*Obtener información de una venta en especifico */
const getSale = async (req, res) => {
    const id = req.params.id;
  
    try {
        const sale = await modelSale.findById(id);
        if (!sale) {
            return res.status(404).json({ message: 'Sale not found' });
        }
        return res.status(200).json(sale);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/*Actualizar la información de una venta en la base de datos */
const updateSale = async (req,res)=>{
    const { id } = req.params;
    const { nameSale,valueSale,dateSale,saleProducts } = req.body;
    try {
      const sale = await modelSale.findByIdAndUpdate(id, { nameSale,valueSale,dateSale,saleProducts }, { new: true });
      return res.status(200).send(sale);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
}

/*Eliminar una venta en especifico de la base de datos */
const removeSale = async(req, res)=>{
    try{
        const {id} = req.params;
        const saleDelete = await modelSale.findByIdAndDelete(id)
        if(saleDelete === null) {
            return res.status(404).json({message: "Sale not found"});
        }
        return res.status(204).json();
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Zona Exportación de Funciones */

module.exports = {
    createSale,
    getSales,
    getSale,
    updateSale,
    removeSale
}