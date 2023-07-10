import CategoryModel from '../../model/productSchema/categorySchema.js'


export const GetCategory = async(resq, resp) => {
    // console.log('hit')
    try {
        const category = await CategoryModel.find({})
        return resp.status(201).json({
            sucess: true,
            category
        })
    } catch (error) {
        console.log(error.message)
    }
    
}

export const CreateCategory = async(resq, resp) => {
    const {name} = resq.body
    if(!name){
        return resp.status(400).json({
            sucess: false,
            message: "Please provide category name"
        })
    }
    try {
        const create = await CategoryModel.create(resq.body)
        if(create){
            return resp.status(201).json({
                sucess: true,
                message: "Category created sucessfully!!"
            })
        } 
    } catch (error) {
        console.log(error.message)
    }
}

export const UpdateCategory = async(resq, resp) => {
    const {name, id} = resq.body
    if(!name || !id){
        return resp.status(400).json({
            sucess: false,
            message: "Please provide full info"
        })
    }
    try {
        const update = await CategoryModel.findByIdAndUpdate(
            {_id: id},
            {name: name}
        )
        return resp.status(200).json({
            sucess: true,
            message: "Update sucessfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const DeleteCategory = async(resq, resp) => {
    const {name, id} = resq.body
    if(!name || !id){
        return resp.status(400).json({
            sucess: false,
            message: "Please provide full info"
        })
    }
    try {
        const del = await CategoryModel.deleteOne({_id: id})
        return resp.status(200).json({
            sucess: true,
            message: "Deleted sucessfully!!"
        })
    } catch (error) {
        console.log(error.message)
    }
}