import { Product } from '../Models/Product.model.js';
import Data from '../Data.json' assert { type: 'json' }; // Ensure this is correctly imported
import asyncHandler from '../Utils/AsyncHandler.js';
`node --trace-warnings ...`

// POST the data to MongoDB
const uploadData = asyncHandler(async (req, res) => {
  try {
    console.log('Starting data upload...');

    await Product.deleteMany({}); // Delete all existing products before inserting new ones

    // Assuming Data is an object with arrays like SliderProduct, MenProducts, etc.
    const { SliderProduct, MenProducts, WomenProducts, LimeCart } = Data;

    // Create an array combining all products with their respective category
    const allProducts = [
      ...SliderProduct.map(product => ({ ...product, category: 'SliderProduct' })),
      ...MenProducts.map(product => ({ ...product, category: 'MenProducts' })),
      ...WomenProducts.map(product => ({ ...product, category: 'WomenProducts' })),
      ...LimeCart.map(product => ({ ...product, category: 'LimeCart' })),
    ];

    // Insert all products into MongoDB
    await Product.insertMany(allProducts);

    console.log('Data uploaded successfully!');
    res.status(200).json({ message: 'Data uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to retrieve products from the SliderProduct category
const getSliderProduct = asyncHandler(async (req, res) => {
  try {
    const SliderProduct = await Product.find({ category: 'SliderProduct' });
    res.status(200).json(SliderProduct); // Send the womenProducts as JSON response
  } catch (error) {
    console.error('Error retrieving SliderProduct:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Function to retrieve products from the MenProducts category
const getMenProducts = asyncHandler(async (req, res) => {
  try {
    const MenProducts = await Product.find({ category: 'MenProducts' });
    res.status(200).json(MenProducts); // Send the womenProducts as JSON response
  } catch (error) {
    console.error('Error retrieving MenProducts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Function to retrieve products from the WomenProducts category
const getWomenProducts = asyncHandler(async (req, res) => {
  try {
    const womenProducts = await Product.find({ category: 'WomenProducts' });
    res.status(200).json(womenProducts); // Send the womenProducts as JSON response
  } catch (error) {
    console.error('Error retrieving WomenProducts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Function to retrieve products from the LimeCart category
const getLimeCart = asyncHandler(async (req, res) => {
  try {
    const LimeCart = await Product.find({ category: 'LimeCart' });
    res.status(200).json(LimeCart); // Send the womenProducts as JSON response
  } catch (error) {
    console.error('Error retrieving LimeCart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export { uploadData, getWomenProducts, getLimeCart, getMenProducts, getSliderProduct };
