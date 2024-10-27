const stripe = require("../../config/stripe");
const userModel = require("../../models/userModel");

const paymentController = async (request, response) => {
  try {
    const { cartItems } = request.body;

    const user = await userModel.findOne({ _id: request.userId });

    const param = {
      submit_type: "pay",
      mode: "payment", // For one-time payments
      payment_method_types: ["card"], // Fix typo (should be plural)
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1Q4rysFbT5Bfl2trJtYmRjUm", // Shipping rate ID
        },
      ],
      customer_email: user.email, 
      metadata: {
        email: request.userId
      },
      // Customer email
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            // Fix typo: 'product_datta' to 'product_data'
            name: item.productId.productName,
            images: item.productId.productImages, // Ensure this is an array
            metadata: {
              productId: item.productId._id,
            },
          },
          unit_amount: item.productId.sellingPrice * 100, // Stripe requires amounts in the smallest currency unit (i.e., paise for INR)
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    // Using Checkout Sessions instead of Payment Intents
    const session = await stripe.checkout.sessions.create(param);

    // Return session data to the frontend
    response.status(303).json(session);
  } catch (error) {
    response.json({
      message: error?.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = paymentController;
