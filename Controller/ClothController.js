const ClothModel = require("../Schema/ClothSchema")
const postData =async (req,res)=>{
    try {
        const data = req.body
        if(!data){
            return res.status(404).json({
                success: false,
                message : "data is not coming"
                })}
        const newData = new ClothModel(data)
        const response = await newData.save()
        if(!response){
            return res.status(404).json({
                success: false,
                message : "response is not coming"
                })}
        res.status(200).json({
            success : true,
            message : "All OK",
            data  : response
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message  : "error",
            error : error.message
        })
    }
};


const getData = async(req,res)=>{
    try {

        const response = await ClothModel.find()
        console.log(response);
        if(!response){
            return res.status(404).json({
                success: false,
                message : "response is not coming"
                })}
        res.status(200).json({
            success : true,
            message : "All OK",
            data  : response
        })


        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message  : "error",
            error : error.message
        })
    }
};

const singleData = async(req,res)=>{
    try {
        const id = req.params.id
        if(!id){
            return res.status(404).json({
                success: false,
                message : "id is incorrect"
                })}

        const response = await ClothModel.findById(id)
        console.log(response);
        if(!response){
            return res.status(404).json({
                success: false,
                message : "response is not coming"
                })}
                res.status(200).json({
                    success : true,
                    message : "All OK",
                    data  : response
                })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message  : "error",
            error : error.message
        })
    }
};

const updateData = async(req,res)=>{
    try {
        const findid = req.params.id
        if(!findid){
            return res.status(404).json({
                success: false,
                message : "id is incorrect"
                })}
            const response = await ClothModel.findByIdAndUpdate(findid,{$set : {"price":8000}},{
            new : true,
            runValidators:true
        })
        if(!response){
            return res.status(400).json({
                success : false,
                message : "response not came"
            })
        }
        console.log("data updated");
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            success:false,
            message  : "error",
            error : error.message
        })
    }
};

const deleteData = async (req,res)=>{
    try {
        const allDelete = await ClothModel.deleteMany()
        console.log(allDelete)
        if(!allDelete){
            return res.status(404).json({
                success:false,
                message:"data not deleted"
            })
        }
        res.status(200).json({
            success:true,
            message : "data deleted",
            data : allDelete
        })

    } catch (error) {
         return res.status(500).json({
            success:false,
            message  : "error",
            error : error.message
        })
    }
}



module.exports =  { 
    postData , getData, singleData , updateData , deleteData
}