const mongoose=require("mongoose");


const aboutSchema=new mongoose.Schema({
  content:{
    type:String
  }
})


const AboutModel=mongoose.model("About",aboutSchema)


module.exports=AboutModel