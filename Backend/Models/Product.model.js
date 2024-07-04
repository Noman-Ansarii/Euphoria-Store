import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProductSchema = new Schema({
    imageSrc: String,
    description: String,
    Price: String,
    about: String,
    category: {
        type: String,
        enum: ['SliderProduct', 'MenProducts', 'WomenProducts', 'LimeCart'],
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

export { Product };
