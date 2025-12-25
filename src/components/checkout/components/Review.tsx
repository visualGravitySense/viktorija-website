import * as React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';

// Payment details will be passed as props or can be stored in context/state management
interface ReviewProps {
  paymentSuccess?: boolean;
  paymentData?: any;
  orderTotal?: string;
  orderDetails?: {
    name: string;
    detail: string;
  }[];
}

export default function Review({ 
  paymentSuccess = true, 
  paymentData = null, 
  orderTotal = '700€',
  orderDetails = null
}: ReviewProps) {
  const { t } = useTranslation();
  
  // Google Ads Conversion Tracking
  React.useEffect(() => {
    if (paymentSuccess && typeof window !== 'undefined' && window.gtag) {
      // Extract numeric value from orderTotal (remove € and parse)
      const numericValue = parseFloat(orderTotal.replace(/[^\d.,]/g, '').replace(',', '.')) || 1.0;
      
      // Generate or use transaction ID from payment data
      const transactionId = paymentData?.id || paymentData?.paymentIntentId || `TXN-${Date.now()}`;
      
      // Send conversion event to Google Ads
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17804500858/xC1QCPztwdQbEPq-7KlC',
        'value': numericValue,
        'currency': 'EUR',
        'transaction_id': transactionId
      });
    }
  }, [paymentSuccess, orderTotal, paymentData]);
  
  // Default payment details if not provided through props
  const payments = paymentData ? [
    { name: 'Payment method:', detail: paymentData.card?.brand || 'Credit Card' },
    { name: 'Payment ID:', detail: paymentData.id || 'xxxx-xxxx-xxxx-1234' },
    { name: 'Date:', detail: new Date(paymentData.created || Date.now()).toLocaleDateString() },
  ] : [
    { name: 'Card type:', detail: 'Visa' },
    { name: 'Card holder:', detail: 'Mr. John Smith' },
    { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
    { name: 'Expiry date:', detail: '04/2024' },
  ];
  
  // Default address if not provided
  const addresses = ['1 Driving School St.', 'Reactville', 'Anytown', '99999', 'Country'];
  
  return (
    <Stack spacing={2}>
      {paymentSuccess && (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 2, 
          mb: 4, 
          p: 3,
          bgcolor: 'success.light',
          color: 'success.contrastText',
          borderRadius: 1,
        }}>
          <CheckCircleIcon sx={{ fontSize: 48 }} />
          <Typography variant="h6" align="center">
            {t('checkout.review.payment_successful')}
          </Typography>
          <Typography variant="body2" align="center">
            {t('checkout.review.confirmation_email')}
          </Typography>
        </Box>
      )}
      
      <Typography variant="h6" gutterBottom>
        {t('checkout.review.order_summary')}
      </Typography>
      
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText 
            primary={t('checkout.review.service')} 
            secondary={t('checkout.review.driving_lessons')} 
          />
          <Typography variant="body2">{orderTotal}</Typography>
        </ListItem>
        {orderDetails && orderDetails.map((item) => (
          <ListItem key={item.name} sx={{ py: 1, px: 0 }}>
            <ListItemText 
              primary={item.name} 
              secondary={item.detail} 
            />
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary={t('checkout.review.total')} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {orderTotal}
          </Typography>
        </ListItem>
      </List>
      
      <Divider />
      
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            {t('checkout.review.shipment_details')}
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {addresses.join(', ')}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            {t('checkout.review.payment_details')}
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
