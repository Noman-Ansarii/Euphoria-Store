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
    role: { type: String, enum: ['user', 'admin'], default: 'user' } // Add role field
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export {
    User
}