require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

class Stripe {
 

  async checkout(cartItems) {
    const stripeProductArray = [];

    cartItems.map((a) => {
      const itemObject = {
        price_data: {
          currency: "huf",
          product_data: {
            name: a.name,
          },
          unit_amount: a.finalPrice * 100,
        },
        quantity: a.count,
      };
      stripeProductArray.push(itemObject);
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: stripeProductArray,
      mode: "payment",
      success_url: "https://localhost:3000/stripesuccessful",
      cancel_url: "https://localhost:3000/stripefailed",
    });


    return await session;
  }

 
}

module.exports = Stripe;
