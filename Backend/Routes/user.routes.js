import { Router } from 'express'; // Import express
import { signupUser, signinUser, fetchUser, deleteUser, assignAdminRole } from '../Controllers/index.controllers.js'; // Import the signupUser controller function
import { addWishlistItem, getWishisItem } from '../Controllers/Data.Controller.js'
import middleware from '../Middleware/fetchUser.middleware.js';
import { addProducttoMongoDB } from '../Controllers/Product.controller.js';

const router = Router(); // Initialize the router

// Define the /signup route
router.route('/signup').post(signupUser);

// Define the /login route
router.route('/login').post(signinUser);

// Define the /getUserData route Login Required
router.route('/pr0f1l3/:id').get(middleware, fetchUser);

// Define the /Delete User route
router.route('/d3l3t3/:id').delete(middleware, deleteUser);

router.route('/add-product').post(middleware, addProducttoMongoDB);

router.route('/wishlist').post(middleware, addWishlistItem);

router.route('/favorites').get(middleware, getWishisItem);

export default router; // Export the router
