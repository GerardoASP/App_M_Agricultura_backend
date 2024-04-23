const express = require("express")
const app = express()
const bodyParser = require("body-parser") //Visualización del contenido del endpoint

const farmRoutes = require("./routes/farm");
const incomeRoutes = require("./routes/income");
const lotRoutes = require("./routes/lot");
const productRoutes = require("./routes/product");
const saleRoutes = require("./routes/sale");
const spentRoutes = require("./routes/spent");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");                                                                                                                                        
const publicationRoutes = require("./routes/publication");                                                                                                                                        
const dotenv = require('dotenv').config()

const cors = require("cors")

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("uploads"));
app.use('/uploads', express.static('uploads'));

app.use(`/${process.env.API_PATH}/farms`,farmRoutes);
app.use(`/${process.env.API_PATH}/incomes`,incomeRoutes);
app.use(`/${process.env.API_PATH}/lots`,lotRoutes);
app.use(`/${process.env.API_PATH}/products`,productRoutes);
app.use(`/${process.env.API_PATH}/sales`,saleRoutes);
app.use(`/${process.env.API_PATH}/spents`,spentRoutes);
app.use(`/${process.env.API_PATH}/users`,userRoutes);
app.use(`/${process.env.API_PATH}/auth`,authRoutes);
app.use(`/${process.env.API_PATH}/publications`,publicationRoutes);

module.exports = app