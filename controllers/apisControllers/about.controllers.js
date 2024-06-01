const AboutModel = require("../../models/about.model");

exports.getAboutContent = async (req, res) => {
  try {
    const aboutData = await AboutModel.find({});

    res.status(200).json({
      success: true,
      message: "Fetch successfully",
      data: aboutData,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createAbout = async (req, res) => {
  try {
    const aboutData = await AboutModel.create(req.body);
    res.status(200).json({
      success: true,
      message: "create successfully",
      data: aboutData,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.editAbout = async (req, res) => {
  try {
    const {id}=req.params
    const aboutData = await AboutModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success:true,
      message:"Fetch successfully",
      data:aboutData
    })
  } catch (err) {
    console.log(err);
  }
};

exports.deleteAbout=async(req,res)=>{
  try{
    const {id}=req.params
    const aboutData=await AboutModel.findByIdAndDelete({_id:id},{new:true});
    res.status(200).json({
      success:true,
      message:"update successsfgullty",
      data:aboutData
    })
  }catch(err){
    console.log(err)
  }
}
