const stripe = require("../../config/stripe.js");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;
const webhook = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  const payloadString = JSON.stringify(request.body);
  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  //handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log(session);

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  response.status(200).send();
};
module.exports = webhook;
