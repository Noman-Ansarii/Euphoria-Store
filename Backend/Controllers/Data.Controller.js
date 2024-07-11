import { User } from '../Models/user.model.js'

// Example backend route handler for adding item to wishlist
const addToWishlist = async (req, res) => {
    const userId = req.params.userId; // Extract userId from request params
    const { productId, description, Price, image } = req.body;

    const errors = [];
    if (!productId) errors.push("Product ID is required");
    if (!description) errors.push("Description is required");
    if (!Price) errors.push("Price is required");
    if (!image) errors.push("Image source is required");

    if (errors.length > 0) {
        return res.status(400).json({ message: errors.join(', ') });
    }

    try {
        // Fetch the user from the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the wishlist item to the user's wishlist array
        user.wishlist.push({ productId, description, Price, image });

        // Save the updated user document back to the database
        await user.save();

        res.status(200).json({ message: 'Item added to wishlist successfully' });
    } catch (error) {
        console.error("Error adding item to wishlist", error);
        res.status(500).json({ message: 'Failed to add item to wishlist' });
    }
};


// remove item from mongoDB as well
const removeFromWishlist = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove item from wishlist using productId
        user.wishlist = user.wishlist.filter(item => item.productId.toString() !== productId);
        await user.save();

        res.status(200).json({ message: "Item removed from wishlist" });
    } catch (error) {
        console.error("Error removing item from wishlist", error);
        res.status(500).json({ error: "Failed to remove item from wishlist" });
    }
};



// Get wishlist for a user

const getWishlist = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ wishlist: user.wishlist });
    } catch (error) {
        console.error("Error fetching wishlist", error);
        res.status(500).json({ error: "Failed to fetch wishlist" });
    }
};
// Example backend route handler for adding item to cartlist
const addToCart = async (req, res) => {
    const userId = req.params.userId; // Extract userId from request params
    const { productId, description, Price, image } = req.body;

    const errors = [];
    if (!productId) errors.push("Product ID is required");
    if (!description) errors.push("Description is required");
    if (!Price) errors.push("Price is required");
    if (!image) errors.push("Image source is required");

    if (errors.length > 0) {
        return res.status(400).json({ message: errors.join(', ') });
    }

    try {
        // Fetch the user from the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the cartlist item to the user's cartlist array
        user.cartlist.push({ productId, description, Price, image });

        // Save the updated user document back to the database
        await user.save();

        res.status(200).json({ message: 'Item added to catlist successfully' });
    } catch (error) {
        console.error("Error adding item to cartlist", error);
        res.status(500).json({ message: 'Failed to add item to cartlist' });
    }
};


// remove item from mongoDB as well
const removeFromCartList = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove item from cartlist using productId
        user.cartlist = user.cartlist.filter(item => item.productId.toString() !== productId);
        await user.save();

        res.status(200).json({ message: "Item removed from cartlist" });
    } catch (error) {
        console.error("Error removing item from cartlist", error);
        res.status(500).json({ error: "Failed to remove item from cartlist" });
    }
};



// Get CartItem for a user

const getCartList = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ cartlist: user.cartlist });
    } catch (error) {
        console.error("Error fetching cartlist", error);
        res.status(500).json({ error: "Failed to fetch cartlist" });
    }
};


export {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
    addToCart,
    getCartList,
    removeFromCartList,
};