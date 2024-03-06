const express = require('express');
const modelIncome = require('../models/income');

/* CRUD */

/*Crear un ingreso en la base de datos*/
const createIncome = async (req, res)=>{
    try{
        const {nameIncome,valueIncome,dateIncome,incomeLot,incomeSale} = req.body;
        // console.log(req.body);
        const newIncome = new modelIncome({nameIncome,valueIncome,dateIncome,incomeLot,incomeSale});
        // console.log(newPost);
        const savedIncome = await newIncome.save();
        // res.status(201).json({message: "Post created"});
        return res.status(201).json(savedIncome);
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Listar todos los ingresos */
const getIncomes = async (req, res)=>{
    try{
        const incomes = await modelIncome.find();
        return res.status(200).json(incomes);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

/*Obtener información de un ingreso en especifico */
const getIncome = async (req, res) => {
    const id = req.params.id;
  
    try {
        const income = await modelIncome.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        return res.status(200).json(income);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/*Actualizar la información de un ingreso en la base de datos */
const updateIncome = async (req,res)=>{
    const { id } = req.params;
    const { nameIncome,valueIncome,dateIncome,incomeLot,incomeSale } = req.body;
    try {
      const income = await modelIncome.findByIdAndUpdate(id, { nameIncome,valueIncome,dateIncome,incomeLot,incomeSale }, { new: true });
      return res.status(200).send(income);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
}

/*Eliminar un ingreso en especifico */
const removeIncome = async(req, res)=>{
    try{
        const {id} = req.params;
        const incomeDelete = await modelIncome.findByIdAndDelete(id)
        if(incomeDelete === null) {
            return res.status(404).json({message: "Income not found"});
        }
        return res.status(204).json();
    }catch(error){
        return res.status(400).json({message: error.message});
    }
}

/*Zona Exportación de Funciones */

module.exports = {
    createIncome,
    getIncomes,
    getIncome,
    updateIncome,
    removeIncome
}