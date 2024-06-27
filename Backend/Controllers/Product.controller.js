import { Product } from "../Models/Product.model.js";
import asyncHandler from "../Utils/AsyncHandler.js";

const addProducttoMongoDB = asyncHandler(async (req, res) => {
    const { description, price, image } = req.body;

    try {
        const newProduct = new Product({
            description,
            price,
            image,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export {
    addProducttoMongoDB
}