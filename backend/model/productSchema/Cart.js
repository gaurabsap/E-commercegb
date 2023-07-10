import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Userdata'
    },
    catergory: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Category'
    },
    product: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Product'
    },
    quantity: {
        type: Number,
        default: 1
    }

},{timestamps: true})

const CartModel = mongoose.model('Cart', CartSchema)

export default CartModel;