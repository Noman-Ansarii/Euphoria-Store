import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    wishlist: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            description: { type: String, required: true },
            Price: { type: String, required: true },
            image: { type: String, required: true }
        }
    ],
    cartlist: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            description: { type: String, required: true },
            Price: { type: String, required: true },
            image: { type: String, required: true }
        }
    ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export {
    User
}