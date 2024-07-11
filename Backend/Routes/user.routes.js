import { Router } from 'express'; // Import express
import { signupUser, signinUser, fetchUser, deleteUser, forgotPassword, resetPassword, saveCheckoutData, getMyOrders } from '../Controllers/index.controllers.js'; // Import the signupUser controller function
import middleware from '../Middleware/fetchUser.middleware.js';
import { addToCart, addToWishlist, getCartList, getWishlist, removeFromCartList, removeFromWishlist } from '../Controllers/Data.Controller.js';

const router = Router(); // Initialize the router

// Define the /signup route
router.route('/signup').post(signupUser);

// Define the /login route
router.route('/login').post(signinUser);

// Define the /getUserData route Login Required
router.route('/pr0f1l3/:id').get(middleware, fetchUser);

// Define the /Delete User route
router.route('/d3l3t3/:id').delete(middleware, deleteUser);

// Route to handle forgot password request
router.route('/forgot-password').post(forgotPassword);
router.route('/reset/:userId/:token').post(resetPassword);

// WishlistItem ROUTE
router.route('/favorites/:userId').get(getWishlist);
router.route('/wishlist/:userId').post(addToWishlist);
router.route('/wishlist/:userId/:productId').delete(removeFromWishlist);

// CartlistItem ROUTE
router.route('/cartitem/:userId').get(getCartList);
router.route('/cartlist/:userId').post(addToCart);
router.route('/cartitem/:userId/:productId').delete(removeFromCartList);

// Checkout Item Route
router.route('/checkout/:userId').post(saveCheckoutData);
router.route('/myorders/:userId').get(getMyOrders);

export default router; // Export the router
