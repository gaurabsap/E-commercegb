import mongoose from "mongoose";


const CategoryApi = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createAt: {
        type: Date
    }
})

const CategoryModel = mongoose.model('Category', CategoryApi)

export default CategoryModel;