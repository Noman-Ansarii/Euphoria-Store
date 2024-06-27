// models/Product.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: [
        {
            description: String,
            price: String,
            image: String
        }
    ]
});

const Product = mongoose.model('Product', ProductSchema);

export { Product };
