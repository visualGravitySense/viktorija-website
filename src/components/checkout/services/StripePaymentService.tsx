import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  CardElementProps
} from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';

// Replace with your actual Stripe publishable key
// NOTE: This should come from environment variables in a real production app
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const CARD_ELEMENT_OPTIONS: CardElementProps['options'] = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
  hidePostalCode: true,
};

export const CardForm: React.FC<{ onSuccess: (paymentMethod: any) => void }> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    if (!cardComplete) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setProcessing(false);
      setError(t('checkout.payment.card_element_error'));
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message || t('checkout.payment.generic_error'));
      } else if (paymentMethod) {
        onSuccess(paymentMethod);
      }
    } catch (err) {
      setError(t('checkout.payment.generic_error'));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 3 }}>
        <CardElement
          options={CARD_ELEMENT_OPTIONS}
          onChange={(e) => {
            setError(e.error ? e.error.message : '');
            setCardComplete(e.complete);
          }}
        />
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Button
        variant="contained"
        color="primary"
        disabled={!stripe || processing || !cardComplete}
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        {processing ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            {t('checkout.payment.processing')}
          </Box>
        ) : (
          t('checkout.payment.pay_now')
        )}
      </Button>
    </form>
  );
};

export const StripePaymentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

// Hook to use in components that need to process payments
export const usePaymentProcessor = () => {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);

  const processPayment = async (amount: number, currency: string = 'eur', paymentMethod: any) => {
    setPaymentStatus('processing');
    
    try {
      // In a real application, you would make an API call to your backend
      // which would then create a PaymentIntent with Stripe
      // For demo purposes, we're simulating a successful payment
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful payment response
      const paymentResponse = {
        id: `pi_${Math.random().toString(36).substring(2, 15)}`,
        amount,
        currency,
        status: 'succeeded',
        created: Date.now(),
        paymentMethod: paymentMethod.id,
      };
      
      setPaymentData(paymentResponse);
      setPaymentStatus('success');
      return paymentResponse;
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

  const resetPayment = () => {
    setPaymentStatus('idle');
    setPaymentError(null);
    setPaymentData(null);
  };

  return {
    paymentStatus,
    paymentError,
    paymentData,
    processPayment,
    resetPayment,
  };
}; 