const express = require('express');
const modelLot = require('../models/lot');
const modelFarm = require('../models/farm');
const modelProduct = require('../models/product');
const { default: mongoose } = require('mongoose');
const modelSpent = require('../models/spent');
const modelSale = require('../models/sale');

/* CRUD */

/*Crear un lote en la base de datos*/
const createLot = async (req, res)=>{
    try{
        const {lotType,area,lotFarm,lotProducts,lotSpents} = req.body;
        // console.log(req.body);
        const newLot = new modelLot({lotType,area,lotFarm,lotProducts,lotSpents});
        // console.log(newPost);
        const savedLot = await newLot.save();
        // res.status(201).json({message: "Post created"});

        // Recupera el usuario al que deseas agregar el post
        const farm = await modelFarm.findById(lotFarm);
        
        // Agrega el ObjectId del nuevo post al array correspondiente
        farm.farmLots.push(savedLot._id);
        
        // Guarda el usuario
        await farm.save();
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
    const { lotType,area,lotFarm,lotProducts,lotSpents } = req.body;
    try {
      const lot = await modelLot.findByIdAndUpdate(id, { lotType,area,lotFarm,lotProducts,lotSpents }, { new: true });
      return res.status(200).send(lot);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
}

/*Eliminar un lote en especifico de la base de datos */
const removeLot = async(req, res)=>{
    const farmId = req.body.farmId;
    try{
        const {id} = req.params;
        const lotDelete = await modelLot.findByIdAndDelete(id)
        // Encuentra el usuario al que deseas agregar el post
        const farm = await modelFarm.findById(farmId);
        
        // Elimina el post del array 'posts' del usuario
        farm.farmLots.pull(id);
        await farm.save();
        if(lotDelete === null) {
            return res.status(404).json({message: "Lot not found"});
        }
        return res.status(204).json();
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

// Obtener finca asociada a un lote
const getFarmOfLot = async (req, res) => {
    try {
        // Obtenemos el ID del proyecto de los parámetros de la solicitud
        const { id } = req.params;
  
        // Buscamos el lote en la base de datos utilizando su ID
        const lot = await modelLot.findById(id);
  
        // Verificamos si la finca existe
        if (!lot) {
            return res.status(404).json({ message: "lot not found" });
        }
  
        // Obtenemos el ID de la finca  asociada al lote
        const farmId = lot.lotFarm;
        console.log(farmId);
        // Buscamos los fincas en la base de datos utilizando sus IDs
        const searchFarm = await modelFarm.findById(farmId);
        if(!searchFarm){
            return res.status(404).json({ message: "farm not found" });
        }
        // Retornamos el usuario asociado a la finca
        res.status(200).json(searchFarm);
    } catch (error) {
        // Manejamos errores
        res.status(500).json({ message: error.message });
    }
  }

  const getProductsOfLot = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscamos el lote en la base de datos utilizando su ID
      const lot = await modelLot.findById(id);
  
      // Verificamos si el lote existe
      if (!lot) {
        return res.status(404).json({ message: "Lot not found" });
      }
  
      // Obtenemos los IDs de los productos asociadas al lote
      const productsIds = lot.lotProducts.map(id => new mongoose.Types.ObjectId(id));
      //console.log(publicationIds)
  
      // Verificamos que haya IDs de lotes
      if (!productsIds || productsIds.length === 0) {
        products2 = []
        return res.status(404).json(products2);
      }
  
      // Buscamos los productos en la base de datos utilizando los IDs
      const products = await modelProduct.find({ _id: { $in: productsIds } });
  
      //console.log("Publications found:", publications);
      // Verificamos si se encontraron productos
      if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found for the given IDs" });
      }
  
      // Retornamos los productos encontrados
      res.status(200).json(products);
    } catch (error) {
      // Manejamos errores
      console.error("Error fetching user publications:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const getSpentsOfLot = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscamos el lote en la base de datos utilizando su ID
      const lot = await modelLot.findById(id);
  
      // Verificamos si el lote existe
      if (!lot) {
        return res.status(404).json({ message: "Lot not found" });
      }
  
      // Obtenemos los IDs de los productos asociadas al lote
      const spentsIds = lot.lotSpents.map(id => new mongoose.Types.ObjectId(id));
      //console.log(publicationIds)
  
      // Verificamos que haya IDs de lotes
      if (!spentsIds || spentsIds.length === 0) {
        return res.status(404).json({ message: "No spents found for this lot" });
      }
  
      // Buscamos los productos en la base de datos utilizando los IDs
      const spents = await modelSpent.find({ _id: { $in: spentsIds } });
  
      //console.log("Publications found:", publications);
      // Verificamos si se encontraron productos
      if (!spents || spents.length === 0) {
        return res.status(404).json({ message: "No spents found for the given IDs" });
      }
  
      // Retornamos los productos encontrados
      res.status(200).json(spents);
    } catch (error) {
      // Manejamos errores
      console.error("Error fetching lot spents:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const getSumSpentsOfLot = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscamos el lote en la base de datos utilizando su ID
      const lot = await modelLot.findById(id);
  
      // Verificamos si el lote existe
      if (!lot) {
        return res.status(404).json({ message: "Lot not found" });
      }
  
      // Obtenemos los IDs de los productos asociadas al lote
      const spentsIds = lot.lotSpents.map(id => new mongoose.Types.ObjectId(id));
      //console.log(publicationIds)
  
      // Verificamos que haya IDs de lotes
      if (!spentsIds || spentsIds.length === 0) {
        return res.status(404).json({ message: "No spents found for this lot" });
      }
  
      // Buscamos los productos en la base de datos utilizando los IDs
      const spents = await modelSpent.find({ _id: { $in: spentsIds } });

      //console.log("Publications found:", publications);
      // Verificamos si se encontraron productos
      if (!spents || spents.length === 0) {
        return res.status(404).json({ message: "No spents found for the given IDs" });
      }

      //const sumSpents = spents.map(spentIterator );
      const sumSpents = spents.reduce((total, spent) => total + spent.valueSpent, 0);
      // Retornamos los productos encontrados
      res.status(200).json(sumSpents);
    } catch (error) {
      // Manejamos errores
      console.error("Error fetching lot spents:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const getSalesOfLot = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscamos el lote en la base de datos utilizando su ID
      const lot = await modelLot.findById(id);
  
      // Verificamos si el lote existe
      if (!lot) {
        return res.status(404).json({ message: "Lot not found" });
      }
  
      // Obtenemos los IDs de los productos asociadas al lote
      const salesIds = lot.lotSales.map(id => new mongoose.Types.ObjectId(id));
      //console.log(publicationIds)
  
      // Verificamos que haya IDs de lotes
      if (!salesIds || salesIds.length === 0) {
        return res.status(404).json({ message: "No sales found for this lot" });
      }
  
      // Buscamos los productos en la base de datos utilizando los IDs
      const sales = await modelSale.find({ _id: { $in: salesIds } });
  
      //console.log("Publications found:", publications);
      // Verificamos si se encontraron productos
      if (!sales || sales.length === 0) {
        return res.status(404).json({ message: "No sales found for the given IDs" });
      }
  
      // Retornamos los productos encontrados
      res.status(200).json(sales);
    } catch (error) {
      // Manejamos errores
      console.error("Error fetching lot sales:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const getSumSalesOfLot = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscamos el lote en la base de datos utilizando su ID
      const lot = await modelLot.findById(id);
  
      // Verificamos si el lote existe
      if (!lot) {
        return res.status(404).json({ message: "Lot not found" });
      }
  
      // Obtenemos los IDs de los productos asociadas al lote
      const salesIds = lot.lotSales.map(id => new mongoose.Types.ObjectId(id));
      //console.log(publicationIds)
  
      // Verificamos que haya IDs de lotes
      if (!salesIds || salesIds.length === 0) {
        return res.status(404).json({ message: "No sales found for this lot" });
      }
  
      // Buscamos los productos en la base de datos utilizando los IDs
      const sales = await modelSale.find({ _id: { $in: salesIds } });

      //console.log("Publications found:", publications);
      // Verificamos si se encontraron productos
      if (!sales || sales.length === 0) {
        return res.status(404).json({ message: "No sales found for the given IDs" });
      }

      //const sumSpents = spents.map(spentIterator );
      const sumSales = sales.reduce((total, sale) => total + sale.valueSale, 0);
      // Retornamos los productos encontrados
      res.status(200).json(sumSales);
    } catch (error) {
      // Manejamos errores
      console.error("Error fetching lot sales:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

/*Zona Exportación de Funciones */

module.exports = {
    createLot,
    getLots,
    getLot,
    updateLot,
    removeLot,
    getFarmOfLot,
    getProductsOfLot,
    getSpentsOfLot,
    getSumSpentsOfLot,
    getSalesOfLot,
    getSumSalesOfLot
}