const { getAboutContent, createAbout, editAbout, deleteAbout } = require("../../controllers/apisControllers/about.controllers");

const aboutRouter=require("express").Router()





aboutRouter.get('/',getAboutContent);
aboutRouter.post('/',createAbout);
aboutRouter.put('/',editAbout);
aboutRouter.delete('/',deleteAbout)








module.exports=aboutRouter