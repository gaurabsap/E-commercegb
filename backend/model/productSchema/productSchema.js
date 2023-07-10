import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide productname']
    },
    desc: {
        type: String,
        required: [true, 'Please provide description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price']
    },
    rating: {
        type: Number,
        default: 5
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: [true, 'Please provide category type']
    },
    quantity: {
        type: Number,
        required: true
    },
    image:
    {
        public_id: {
            type: String,
            default: "abc"
        },
        url:{
            type: String,
            default: "hawa"
        }
    }
},
    {timestamps: true}
)

const ProductModel = mongoose.model('Product', productSchema)

export default ProductModel;