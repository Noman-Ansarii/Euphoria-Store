import mongoose from 'mongoose';
const { Schema } = mongoose;

// Wishlist Schema
const WishlistSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: String,
            description: String,
            price: String,
            image: String
        }
    ]
});

const WishlistItem = mongoose.model('Wishlist', WishlistSchema);

export {
    WishlistItem
}
