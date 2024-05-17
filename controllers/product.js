const express = require('express');
const modelProduct = require('../models/product');
const modelLot = require('../models/lot');
const modelSpent = require('../models/spent');
const { default: mongoose } = require('mongoose');

/* CRUD */

/*Crear un producto en la base de datos*/
const createProduct = async (req, res)=>{
    try{
        const {nameProduct,purpose,variety,weather,postHarvestTime,harvestTime,weight,volume,sowingDate,productLot,productSpents} = req.body;
        // console.log(req.body);
        const newProduct = new modelProduct({nameProduct,purpose,variety,weather,postHarvestTime,harvestTime,weight,volume,sowingDate,productLot,productSpents});
        // console.log(newPost);
        const savedProduct = await newProduct.save();

        // Recupera el usuario al que deseas agregar el post
        const lot = await modelLot.findById(productLot);
        
        // Agrega el ObjectId del nuevo post al array correspondiente
        lot.lotProducts.push(savedProduct._id);
        
        // Guarda el usuario
        await lot.save();

        // res.status(201).json({message: "Post created"});
        res.status(201).json(savedProduct);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

/*Listar todos los productos con su información */
const getProducts = async (req, res)=>{
    try{
        const products = await modelProduct.find();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

/*Obtener información de un producto en especifico */
const getProduct = async (req, res) => {
    const id = req.params.id;
  
    try {
        const product = await modelProduct.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/*Actualizar la información de un producto en la base de datos */
const updateProduct = async (req,res)=>{
    const { id } = req.params;
    const { nameProduct,purpose,variety,weather,postHarvestTime,harvestTime,weight,volume,sowingDate,productLot,productSpents } = req.body;
    try {
      const product = await modelProduct.findByIdAndUpdate(id, { nameProduct,purpose,variety,weather,postHarvestTime,harvestTime,weight,volume,sowingDate,productLot,productSpents }, { new: true });
      res.status(200).send(product);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
}

/*Eliminar un producto en especifico de la base de datos */
const removeProduct = async(req, res)=>{
    const lotId = req.body.lotId;
    try{
        const {id} = req.params;
        const productDelete = await modelProduct.findByIdAndDelete(id)

        // Encuentra el usuario al que deseas agregar el post
        const lot = await modelLot.findById(lotId);
        
        // Elimina el post del array 'posts' del usuario
        lot.lotProducts.pull(id);
        await lot.save();
        if(productDelete === null) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(204).json();
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const getLotOfProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscamos el producto en la base de datos utilizando su ID
      const product = await modelProduct.findById(id);
  
      // Verificamos si el producto existe
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      // Obtenemos el ID del lote
      const lotId = product.productLot

      const searchLot = await modelLot.findById(lotId);
      if(!searchLot){
        return res.status(404).json({ message: "Lot not found" });
      }
      // Retornamos el lote encontrado
      res.status(200).json(searchLot);
    } catch (error) {
      // Manejamos errores
      console.error("Error fetching user publications:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const getSpentsOfProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscamos el lote en la base de datos utilizando su ID
      const product = await modelProduct.findById(id);
  
      // Verificamos si el lote existe
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }
  
      // Obtenemos los IDs de los productos asociadas al lote
      const spentsIds = product.productSpents.map(id => new mongoose.Types.ObjectId(id));
      //console.log(publicationIds)
  
      // Verificamos que haya IDs de lotes
      if (!spentsIds || spentsIds.length === 0) {
        return res.status(404).json({ message: "No spents found for this product" });
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
      console.error("Error fetching product spents:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  const getSumSpentsOfProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Buscamos el lote en la base de datos utilizando su ID
      const product = await modelProduct.findById(id);
  
      // Verificamos si el lote existe
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }
  
      // Obtenemos los IDs de los productos asociadas al lote
      const spentsIds = product.productSpents.map(id => new mongoose.Types.ObjectId(id));
      //console.log(publicationIds)
  
      // Verificamos que haya IDs de lotes
      if (!spentsIds || spentsIds.length === 0) {
        return res.status(404).json({ message: "No spents found for this product" });
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
/*Zona Exportación de Funciones */

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    removeProduct,
    getLotOfProduct,
    getSpentsOfProduct,
    getSumSpentsOfProduct
}