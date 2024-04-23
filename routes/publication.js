const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publication")
const path = require('path');

/* http://localhost:3000/api/v1/publications/new-publication */
router.post("/new-publication", publicationController.createPublication);

/* http://localhost:3000/api/v1/publications */
router.get("/", publicationController.getPublications);

/* http://localhost:3000/api/v1/publications/1 */
router.get("/:id", publicationController.getPublication);

/* http://localhost:3000/api/v1/publications/1 */
router.delete("/:id", publicationController.removePublication);

router.post("/upload-image", publicationController.uploadImage);

router.post("/upload-imageM", publicationController.uploadImageM);

router.put("/:id/edit", publicationController.editPublication);

router.put("/:id/updatePost", publicationController.updatePublication);

router.put("/:id/deleteImage", publicationController.deleteImage);

/* http://localhost:3000/api/v1/publications/search-publication/type/POO */
router.get("/search-publication/type/:type",publicationController.getPublicationsByType);

module.exports = router;