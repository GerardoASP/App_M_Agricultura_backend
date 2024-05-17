const express = require('express');
const modelPublication = require('../models/publication');
const modelUser = require('../models/user');
const modelImage = require('../models/image');
const { GridFsStorage } = require("multer-gridfs-storage")
const path = require('path');
const { MongoClient, GridFSBucket, ObjectID } = require("mongodb");

const axios = require('axios');
const fetch = require('node-fetch');

const dotenv = require('dotenv').config();

const multer = require('multer');

const url = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.DB_HOST}`;

const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp", "image/tiff"];
const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg", "video/x-msvideo", "video/quicktime"];

let date = Date.now();

// Create a storage object with a given configuration
const storage = new GridFsStorage({
    url: url,
    file: (req, file) => {
      //If it is an image, save to photos bucket
      console.log(file)
      if (allowedImageTypes.includes(file.mimetype)) {
        return {
          bucketName: "photos",
          filename: `${date}-${file.originalname}`
        }
      }else if(allowedVideoTypes.includes(file.mimetype)){

      } /* else {
        //Otherwise save to default bucket
        return `${Date.now()}_${file.originalname}`
      } */
    }
});

const storageLocal = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/publications/'); // Directorio donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, date + '-' + file.originalname); // Nombre del archivo
    }
});

const app = express();

const createPublication = async (req, res)=>{
    try{
        const {title,active,avatar,description,typePublication,datePublication,author} = req.body;
        console.log(req.body);
        const newPublication = new modelPublication({title,active,avatar,description,typePublication,datePublication,author});
        // console.log(newPost);
        const savedPublication = await newPublication.save();

        // Recupera el usuario al que deseas agregar el post
        const user = await modelUser.findById(author);
        
        // Agrega el ObjectId del nuevo post al array correspondiente
        user.userPublications.push(savedPublication._id);
        
        // Guarda el usuario
        await user.save();
        res.status(201).json({ message: "Publication created", publication: savedPublication });
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const getPublications = async (req, res)=>{
    try{
        const publications = await modelPublication.find();
        res.status(200).json(publications);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

/*Obtener información de un gasto en especifico */
const getPublication = async (req, res) => {
    const id = req.params.id;
  
    try {
        const publication = await modelPublication.findById(id);
        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }
        return res.status(200).json(publication);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const removePublication = async(req, res)=>{
    const publicationId = req.params.id;
    const userId = req.body.userId;
    console.log(publicationId);
    console.log(userId);
    // const {postId, userId} = req.query;
    // console.log("postId", postId);
    // console.log("userId", userId);
    try{
        // Encuentra el usuario al que deseas agregar el post
        const user = await modelUser.findById(userId);
        
        // Elimina el post del array 'posts' del usuario
        user.userPublications.pull(publicationId);
        await user.save();

        const publicationDelete = await modelPublication.findByIdAndDelete(publicationId)
        if(publicationDelete === null) {
            return res.status(404).json({message: "Publication not found"});
        }
        res.status(204).json(publicationDelete);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const editPublication = async (req, res) => {
    try {
        const publicationId = req.params.id;
        const active = req.body.active;

        console.log(publicationId);
        console.log(active);

        // Validar que el campo 'active' esté presente
        if (active === undefined) {
            return res.status(400).json({ error: 'Debes proporcionar el nuevo valor para el campo active.' });
        }

        // Buscar el post por su ID
        const publication = await modelPublication.findById(publicationId);

        // Verificar si el post existe
        if (!publication) {
            return res.status(404).json({ error: 'Publication no encontrado.' });
        }

        // Actualizar el campo 'active' del post
        publication.active = active;

        // Guardar los cambios en la base de datos
        await publication.save();

        // Responder con el post actualizado
        res.json({ message: 'Campo active editado exitosamente.', publication });
    } catch (error) {
        console.error('Error al editar el campo active del post:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const updatePublication = async (req, res) => {
    try {
        const publicationId = req.params.id;
        const image = req.body.image;

        const title = req.body.title;
        const description = req.body.description;
        const typePublication = req.body.typePublication;
        const avatar = req.body.avatar;
        console.log(publicationId);

        // Buscar el post por su ID
        const publication = await modelPublication.findById(publicationId);

        // Verificar si el post existe
        if (!publication) {
            return res.status(404).json({ error: 'Post no encontrado.' });
        }

        // Actualizar el campo 'active' del post
        publication.avatar = avatar
        publication.title = title;
        publication.description = description;
        publication.typePublication = typePublication;

        // Guardar los cambios en la base de datos
        await publication.save();

        // Responder con el post actualizado
        res.json({ message: 'Imagen agregada exitosamente.', publication });
    } catch (error) {
        console.error('Error al agregar imagen al post:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const deleteImage = async (req, res) => {
    try {
        const publicationId = req.params.id;

        const image = req.body.image;

        console.log(publicationId);

        // Buscar el post por su ID
        const publication = await modelPublication.findById(publicationId);

        // Verificar si el post existe
        if (!publication) {
            return res.status(404).json({ error: 'Post no encontrado.' });
        }

        // Actualizar el campo 'active' del post
        publication.avatar.pull(image);

        // Guardar los cambios en la base de datos
        await publication.save();

        // Responder con el post actualizado
        res.json({ message: 'Campo active editado exitosamente.', publication });
    } catch (error) {
        console.error('Error al editar el campo active del post:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

const uploadImage = async (req, res) => {
    try {
        // const upload = multer({ storage: storage }).single('image');
        const uploadLocal = multer({ storage: storageLocal }).single('files');
        // Ejecutar ambos middlewares en paralelo
        const [localResult, gridFSResult] = await Promise.all([
            // new Promise((resolve, reject) => {
            //     upload(req, res, (err) => {
            //         if (err) {
            //             reject(err);
            //         } else {
            //             resolve();
            //         }
            //     });
            // }),
            new Promise((resolve, reject) => {
                uploadLocal(req, res, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }),
        ]);

        const file = req.file;
        const fileDetails = {
            message: "Uploaded",
            id: file.id,
            name: file.filename,
            contentType: file.contentType,
        };

        // La imagen se cargó con éxito en ambas ubicaciones.
        res.status(201).json({ message: 'File uploaded successfully', fileDetails });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const uploadImageM = async (req, res) => {
    try {
        // const uploadM = multer({ 
        //     storage: storage, 
        //     limits: {
        //         fileSize: 10 * 1024 * 1024, // Tamaño máximo del archivo (aquí, 10 MB)
        //         files: 5, // Número máximo total de archivos (imágenes + videos)
        //         parts: 6
        // } }).array('files', 5);
        // const uploadLocalM = multer({ storage: storageLocal }).array('images', 5);

        const uploadLocalM = multer({
            storage: storageLocal,
            fileFilter: function (req, file, cb) {
                // Filtra los archivos permitidos (puedes personalizar esto según tus necesidades)
                if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
                    cb(null, true);
                } else {
                    cb(new Error('Formato de archivo no válido. Solo se permiten imágenes y videos.'));
                }
            },
            limits: {
                fileSize: 10 * 1024 * 1024, // Tamaño máximo del archivo (aquí, 10 MB)
                files: 5, // Número máximo total de archivos (imágenes + videos)
                parts: 6
            }
        }).array('files', 5); // Usa array en lugar de fields para permitir cualquier combinación de imágenes y videos

        // Ejecutar ambos middleware en paralelo
        await Promise.all([
            // new Promise((resolve, reject) => {
            //     uploadM(req, res, (err) => {
            //         if (err) {
            //             reject(err);
            //         } else {
            //             resolve();
            //         }
            //     });
            // }),
            new Promise((resolve, reject) => {
                uploadLocalM(req, res, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            })
        ]);


        // Acceder a los archivos cargados
        const filesM = req.files; // Resultado de uploadM
        const filesLocalM = req.files; // Resultado de uploadLocalM

        console.log(filesLocalM);

        // // Comprobar si se subieron archivos
        // if ((!filesM && !filesLocalM) || (filesM && filesM.length === 0 && filesLocalM && filesLocalM.length === 0)) {
        //     return res.status(400).json({ error: "No se subieron archivos" });
        // }

        // La imagen se cargó con éxito en ambas ubicaciones.
        res.status(201).json({ message: 'Files uploaded successfully', filesM});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Adicional al crud
//Listar todos las publicaciones que tengan un cierto tipo
const getPublicationsByType = async (req,res) =>{
    try{
      const {type} = req.params;
  
      //Verificar si se proporciona un tema en los parámetros de la URL
      if(!type){
        return res.status(400).json({message:'Por favor, proporciona un tema valido'})
      }
  
      //Busca los productos que coincidan con el tema
      const publications = await modelPublication.find({typePublication:type});
  
      //Verifica si se encontraron productos
      if(publications.length === 0){
        return res.status(404).json({message:'No se encontraron publicaciones para el tipo proporcionado'});
      }
  
      //Devuelve los proyectos encontrados
      res.status(200).json(publications);
    }catch(error){
      res.status(500).json({ message: error.message });
    }
  }

module.exports = {
    createPublication,
    getPublications,
    removePublication,
    uploadImage,
    uploadImageM,
    editPublication,
    updatePublication,
    deleteImage,
    getPublicationsByType,
    getPublication
}

//Errores
/*1)
remote: -----> Installing dependencies
remote:        Installing node modules
remote:        npm ERR! code ERESOLVE
remote:        npm ERR! ERESOLVE could not resolve
remote:        npm ERR!
remote:        npm ERR! While resolving: multer-gridfs-storage@5.0.2
remote:        npm ERR! Found: multer@1.4.5-lts.1
remote:        npm ERR! node_modules/multer
remote:        npm ERR!   multer@"^1.4.5-lts.1" from the root project 

Solución
npm i multer-gridfs-storage --legacy-peer-deps
Link:https://stackoverflow.com/questions/74167128/dependency-problem-using-multer-and-multer-gridfs-storage
*/