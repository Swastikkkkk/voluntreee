const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51RQhMx070ajDSpWDa86fquq0abTdgMM3OnQkrBF4M2kyDZsyLVKFeHmdS3QEHg8zopU7vpvSQZtrTv43X2LKzvtP00HqGHV3wj'); // Replace with your actual secret key

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create checkout session endpoint
app.post('/create-checkout-session', async (req, res) => {
  try {
    const { amount } = req.body;

    // Validate amount
    if (!amount || amount < 50) { // Stripe minimum is $0.50
      return res.status(400).json({ error: 'Invalid amount. Minimum is $0.50' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation',
              description: 'Thank you for your generous donation!',
            },
            unit_amount: amount, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
      metadata: {
        type: 'donation'
      }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Webhook endpoint for Stripe events
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = 'pk_test_51RQhMx070ajDSpWDCpl3Mm5Rvd9Du610u3C1Mz0qLnWKRr638XMGyWAX5RgncNVciSwlFnt2FOYwXIafQMTmyUrR009OeVG9Fj'; // Replace with your webhook secret

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment succeeded for session:', session.id);
      
      // Here you can:
      // - Send confirmation email
      // - Update your database
      // - Trigger any post-payment actions
      
      break;
    case 'payment_intent.payment_failed':
      const paymentIntent = event.data.object;
      console.log('Payment failed:', paymentIntent.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Success page endpoint
app.get('/success', async (req, res) => {
  const { session_id } = req.query;
  
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    res.send(`
      <html>
        <head>
          <title>Payment Successful</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding: 50px;
              background-color: #f0f8f0;
            }
            .container {
              max-width: 500px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .success-icon {
              font-size: 64px;
              color: #4CAF50;
              margin-bottom: 20px;
            }
            h1 { color: #4CAF50; }
            .amount {
              font-size: 24px;
              font-weight: bold;
              color: #333;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-icon">✓</div>
            <h1>Thank You for Your Donation!</h1>
            <div class="amount">Amount: $${(session.amount_total / 100).toFixed(2)}</div>
            <p>Your payment has been processed successfully.</p>
            <p>Transaction ID: ${session.payment_intent}</p>
            <button onclick="window.location.href='/'" style="
              background: #4CAF50;
              color: white;
              padding: 10px 20px;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
              margin-top: 20px;
            ">Return to Home</button>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error retrieving session:', error);
    res.status(500).send('Error processing payment confirmation');
  }
});

// Cancel page endpoint
app.get('/cancel', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Payment Cancelled</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 50px;
            background-color: #fff8f0;
          }
          .container {
            max-width: 500px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .cancel-icon {
            font-size: 64px;
            color: #ff9800;
            margin-bottom: 20px;
          }
          h1 { color: #ff9800; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="cancel-icon">⚠</div>
          <h1>Payment Cancelled</h1>
          <p>Your payment was cancelled. No charges were made.</p>
          <button onclick="window.location.href='/'" style="
            background: #ff9800;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            margin-top: 20px;
          ">Try Again</button>
        </div>
      </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;