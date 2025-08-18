# Stripe Payment Setup Guide

## 🚨 Current Issue: Test Mode Only

**Problem**: The current Stripe integration is in **test mode only** and simulates payments instead of processing real transactions.

**Why payments aren't working**:
- Using test API key: `pk_test_TYooMQauvdEDq54NiTphI7jx`
- No real backend server to process payments
- Payments are simulated, not actual transactions

## 🔧 Solution: Setup Real Stripe Payments

### Step 1: Create Stripe Account

1. Go to [stripe.com](https://stripe.com) and sign up
2. Complete business verification
3. Add your bank account for receiving payments
4. Get your **Live API Keys** from the Dashboard

### Step 2: Environment Configuration

Create `.env.local` file in the project root:

```env
# Stripe Live Keys (Replace with your actual keys)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_actual_live_key_here
STRIPE_SECRET_KEY=sk_live_your_actual_secret_key_here

# Backend API URL (You'll need a backend server)
VITE_API_URL=https://your-backend-server.com/api
```

### Step 3: Backend Server Required

**You need a backend server** to process real payments. The current setup only simulates payments.

#### Option A: Simple Express.js Backend

Create a new file `server.js`:

```javascript
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'eur' } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Backend server running on port 3001');
});
```

#### Option B: Use a Backend-as-a-Service

- **Vercel Functions**: Deploy serverless functions
- **Netlify Functions**: Similar to Vercel
- **Firebase Functions**: Google's serverless platform

### Step 4: Update Frontend Code

Update `src/components/checkout/services/StripePaymentService.tsx`:

```typescript
// Replace the hardcoded test key with environment variable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Update the processPayment function to make real API calls
const processPayment = async (amount: number, currency: string = 'eur', paymentMethod: any) => {
  setPaymentStatus('processing');
  
  try {
    // Create PaymentIntent on your backend
    const response = await fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const { clientSecret } = await response.json();

    // Confirm the payment with Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (paymentIntent.status === 'succeeded') {
      setPaymentData(paymentIntent);
      setPaymentStatus('success');
      return paymentIntent;
    } else {
      throw new Error('Payment failed');
    }
  } catch (error) {
    let errorMessage = 'An error occurred while processing your payment.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    setPaymentError(errorMessage);
    setPaymentStatus('error');
    throw error;
  }
};
```

## 🧪 Testing

### Test Mode (Current)
- Use test card numbers: `4242 4242 4242 4242`
- No real money is charged
- Good for development

### Live Mode (Production)
- Real card numbers will be charged
- Real money transactions
- Requires proper error handling

## 🔒 Security Requirements

1. **Never expose secret keys** in frontend code
2. **Always process payments** on your backend server
3. **Use HTTPS** in production
4. **Validate payment amounts** on the server
5. **Implement webhook handling** for payment confirmations

## 📋 Checklist for Live Payments

- [ ] Stripe account created and verified
- [ ] Live API keys obtained
- [ ] Backend server deployed
- [ ] Environment variables configured
- [ ] Frontend code updated
- [ ] HTTPS enabled
- [ ] Error handling implemented
- [ ] Webhook endpoints configured
- [ ] Payment confirmation emails set up

## 🚀 Quick Start for Testing

If you want to test the current setup:

1. Use test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any 3-digit CVC
4. Any postal code

**Note**: These payments are simulated and won't charge real money.

## 💡 Alternative: Bank Transfer Only

If Stripe setup is complex, you can use **only bank transfer payments** which are already working:

- No backend required
- Real bank account integration
- Manual payment processing
- Lower fees

## 📞 Support

For Stripe-specific issues:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)

For this project:
- Contact: viktorijaautokool@hot.ee
- Phone: +372 53464508
