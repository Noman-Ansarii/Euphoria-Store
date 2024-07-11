import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    billingDetails: {
        firstName: String,
        lastName: String,
        country: String,
        streetAddress: String,
        aptSuite: String,
        city: String,
        state: String,
        postalCode: String,
        phone: String,
    },
    shippingDetails: {
        streetAddress: String,
        aptSuite: String,
        city: String,
        state: String,
        postalCode: String,
    },
    paymentMethod: {
        type: String,
        enum: ['creditCard', 'paypal', 'cashOnDelivery'], // Add cashOnDelivery here
        required: true,
    },
    cartlist: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: String,
        image: String,
        quantity: {
            type: Number,
            default: 1,
        },
    }],
    subtotal: {
        type: Number,
        required: true,
    },
    shipping: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Order = mongoose.model('Order', orderSchema);

export { Order };
