import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '../../services/stripe';
import { saveSubscription } from './_lib/manageSubscription';

//função que converte readable string em uma string, em um objeto em sí (uma requisição)
async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false
  }
};

console.log('entrou no webhooks');

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const secret = req.headers['stripe-signature'];

    let event: Stripe.Event;
    console.log('evento recebido');
    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        console.log('enter in function');
        const checkoutSession = event.data.object as Stripe.Checkout.Session;

        await saveSubscription(
          checkoutSession.subscription.toString(),
          checkoutSession.customer.toString(),
          true
        );
        // switch (type) {
        //   case 'customer.subscription.updated':
        //   case 'customer.subscription.deleted':
        //     const subscription = event.data.object as Stripe.Subscription;

        //     await saveSubscription(subscription.id, subscription.customer.toString(), false);
        //     break;

        //   case 'checkout.session.completed':
        //     const checkoutSession = event.data.object as Stripe.Checkout.Session;

        //     console.log(event.data.object);

        //     await saveSubscription(
        //       checkoutSession.subscription.toString(),
        //       checkoutSession.customer.toString(),
        //       true
        //     );

        //     break;
        //   default:
        //     throw new Error('Unhandled event.');
      } catch (err) {
        // sentry, bugsnag <- para avisar que tem erro
        return res.json({ error: 'Webhook handler failed.' });
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method now allowed');
  }
};
