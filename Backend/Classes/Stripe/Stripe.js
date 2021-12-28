require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([
  [1, { priceInCents: 100000, name: "Learn React Today" }],
  [2, { priceInCents: 200000, name: "Learn CSS Today" }],
]);

const fakeRequest = [
  { id: 1, quantity: 3 },
  { id: 2, quantity: 1 },
];

const mockedOrders = [
  {
    OrderFinalPrice: 6754.5,
    payed: 0,
    creationDate: "1639854710000",
    status: 2,
    id: 1,
    accountId: 22,
    parcelCount: 1,
    statusDescription: "WaitingForCod",
    ContactPerson: {
      DeliveryName: "paska pannácska",
      pclshopId: null,
      Country: "HU",
      ZipCode: "6000",
      City: "kecsenét",
      Address: "asjdaskdaksd",
      Email: "brutalbracsa@gmail.com",
      Phone: "+36202994583",
    },
    OrderItems: [
      {
        name: "Cuutie Doggy",
        imgurl: "https://myfirstwebapp-siwvh.run-eu-central1.goorm.io/apirequests/getwebshopphoto?photoid=6",
        category: {
          name: "Stuffed Toys",
        },
        count: 1,
        netPrice: 3855,
        vat: 25,
        finalPrice: 4337,
        priceReduce: 0,
      },
      {
        name: "Smiling Monchkin",
        imgurl: "https://myfirstwebapp-siwvh.run-eu-central1.goorm.io/apirequests/getwebshopphoto?photoid=5",
        category: {
          name: "Stuffed Toys",
        },
        count: 1,
        netPrice: 2899,
        vat: 25,
        finalPrice: 3261,
        priceReduce: 0,
      },
    ],
  },
];

class Stripe {
  async checkoutTest() {
    console.log("I am the line_items");

    console.log(
      // req.body.items.map((item) => {
      fakeRequest.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "huf",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      })
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: fakeRequest.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "huf",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: "https://localhost:3000",
      cancel_url: "https://localhost:3000/checkout",
    });

    console.log("I am the session.url");
    console.log(session.url);

    return await session;
  }

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
      success_url: "https://localhost:3000",
      cancel_url: "https://localhost:3000/checkout",
    });

    console.log("I am the session.url");
    console.log(session.url);

    return await session;
  }

  async getTopUps() {
    const payouts = await stripe.topups.list({
      limit: 3,
    });
    return payouts;
  }

  async getPayouts() {
    const payouts = await stripe.payouts.list({
      limit: 3,
    });
    return payouts;
  }
  async getCharges() {
    const payments = await stripe.charges.list({
      limit: 3,
    });
    return payments;
  }
  async getPaymentIntent() {
    const payments = await stripe.paymentIntents.list({
      limit: 10,
    });
    return payments;
  }

  PaymentIntent;
}

module.exports = Stripe;
