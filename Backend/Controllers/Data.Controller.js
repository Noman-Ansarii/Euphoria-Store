import { WishlistItem } from '../Models/WishListItems.js';
import asyncHandler from '../Utils/AsyncHandler.js';

const addWishlistItem = asyncHandler(async (req, res) => {
    const userId = req.user && req.user.id ? req.user.id : req.params.id;

    const { productId, description, price, image } = req.body;
    try {
        // Perform validation if necessary

        // Example: Save item to database or perform other operations
        // Replace with your database logic
        const newWishlistItem = await wishlist.create({
            userId,
            productId,
            description,
            price,
            image,
        });

        res.status(201).json({ message: 'Item added to wishlist', item: newWishlistItem });
    } catch (error) {
        console.error('Error adding item to wishlist', error);
        res.status(500).json({ message: 'Failed to add item to wishlist' });
    }
});


// getWishisItem on wishlist page

const getWishisItem = async (req, res) => {
    const { userId } = req.params;
    try {
        // Find the wishlist for the user
        let wishlist = await WishlistItem.findOne({ user: userId });

        if (!wishlist) {
            // If no wishlist exists, create a new one
            wishlist = new WishlistItem({
                user: userId,
                items: []
            });
        }

        res.status(200).json(wishlist);
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ error: "Failed to add item to wishlist" });
    }
};

export {
    addWishlistItem,
    getWishisItem
};
