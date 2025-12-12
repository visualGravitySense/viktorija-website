import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { trackButtonClick } from '../../lib/analytics';

const StyledPaymentButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  textTransform: 'none',
  fontWeight: 600,
  padding: theme.spacing(1.5, 3),
  boxShadow: theme.shadows[2],
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease-in-out',
}));

interface PaymentButtonProps {
  category?: 'category-a' | 'category-b' | 'category-c';
  transmissionType?: 'manual' | 'automatic';
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  children?: React.ReactNode;
  className?: string;
  sx?: any;
}

export default function PaymentButton({
  category = 'category-a',
  transmissionType = 'manual',
  variant = 'contained',
  size = 'medium',
  fullWidth = false,
  children,
  className,
  sx,
}: PaymentButtonProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handlePaymentClick = () => {
    // Map categories to Stripe payment links
    const stripeUrls = {
      'category-a': 'https://buy.stripe.com/8x2aEYewiaJW94hdTa3ZK02',
      'category-b': 'https://buy.stripe.com/14A28s0Fs4lycgtg1i3ZK00',
      'category-c': 'https://buy.stripe.com/eVq5kEgEqcS4a8l5mE3ZK01',
    };
    
    const stripeUrl = stripeUrls[category] || stripeUrls['category-a'];
    
    // Track button click
    trackButtonClick(
      `payment_${category}`,
      'payment',
      'payment_button',
      defaultText,
      stripeUrl
    );
    
    window.open(stripeUrl, '_blank');
  };

  const getPriceByCategory = () => {
    switch(category) {
      case 'category-a':
        return '570€';
      case 'category-b':
        return transmissionType === 'manual' ? '700€' : '840€';
      case 'category-c':
        return '150€';
      default:
        return '570€';
    }
  };

  const defaultText = children || `${t('navigation.book_lesson')} - ${getPriceByCategory()}`;

  return (
    <StyledPaymentButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={handlePaymentClick}
      className={className}
      sx={sx}
    >
      {defaultText}
    </StyledPaymentButton>
  );
}
