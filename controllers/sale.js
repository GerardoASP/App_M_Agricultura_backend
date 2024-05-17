const express = require('express');
const modelSale = require('../models/sale');
const modelLot = require('../models/lot');

/* CRUD */

/*Crear una venta en la base de datos*/
const createSale = async (req, res)=>{
    try{
        const {nameSale,quantity,unitSale,valueSale,dateSale,saleLot} = req.body;
        // console.log(req.body);
        const newSale = new modelSale({nameSale,quantity,unitSale,valueSale,dateSale,saleLot});
        // console.log(newPost);
        const savedSale = await newSale.save();

        // Recupera el usuario al que deseas agregar el post
        const lot = await modelLot.findById(saleLot);

        if(saleLot != ""){
            // Agrega el ObjectId del nuevo gasto al array correspondiente
            lot.lotSales.push(savedSale._id);
        
            // Guarda el lote
            await lot.save();
        }
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
    const { nameSale,quantity,unitSale,valueSale,dateSale,saleLot } = req.body;
    try {
      const sale = await modelSale.findByIdAndUpdate(id, { nameSale,quantity,unitSale,valueSale,dateSale,saleLot }, { new: true });
      return res.status(200).send(sale);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
}

/*Eliminar una venta en especifico de la base de datos */
const removeSale = async(req, res)=>{
    const lotId = req.body.lotId;
    try{
        const {id} = req.params;
        const saleDelete = await modelSale.findByIdAndDelete(id)

        // Encuentra el usuario al que deseas agregar el post
        const lot = await modelLot.findById(lotId);
        
        // Elimina el post del array 'posts' del usuario
        lot.lotSales.pull(id);
        await lot.save();

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