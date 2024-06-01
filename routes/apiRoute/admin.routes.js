const { getAllUnActiveList, updateListStatus } = require("../../controllers/apisControllers/listings.controllers");

const adminRouter=require("express").Router();



adminRouter.get('/listings',getAllUnActiveList)
adminRouter.put('/listings/:id',updateListStatus)




module.exports=adminRouter