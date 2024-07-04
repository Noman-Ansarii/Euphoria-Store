import { Router } from 'express'
import { getLimeCart, getMenProducts, getSliderProduct, getWomenProducts, uploadData } from '../Controllers/Product.controller.js';

const ProductRoute = Router();

// Route For Upload API JSON DATA
ProductRoute.route('/product').post(uploadData);

// ROTE TO FETCH DATA FROM MONGODB USING NODEJS TO FRONTEND
ProductRoute.route('/sliderProduct').get(getSliderProduct)
ProductRoute.route('/menProducts').get(getMenProducts)
ProductRoute.route('/womenProducts').get(getWomenProducts)
ProductRoute.route('/limeCart').get(getLimeCart)

export default ProductRoute;