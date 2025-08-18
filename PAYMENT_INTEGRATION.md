# Payment Integration for Viktorija Driving School

## Overview

This document describes the payment integration system implemented for the Viktorija driving school website. The system supports both Stripe card payments and bank transfers using the Estonian bank account details.

## Features

### 1. Multiple Payment Methods
- **Stripe Card Payments**: Secure credit/debit card processing
- **Bank Transfer**: Direct bank transfer to Estonian account
- **Manual Credit Card**: Basic card form (for testing)

### 2. Bank Account Details
- **Account Holder**: VIKTORIJA AUTOKOOL OSAÜHING
- **Account Number**: EE871010220059959011
- **Bank**: SEB Pank
- **Bank Code**: 1010

### 3. Pricing Structure
- **Category A (Motorcycle)**: 570€
- **Category B (Manual)**: 700€
- **Category B (Automatic)**: 840€
- **Category C (Final Course)**: 150€

## Components

### 1. PaymentButton Component
Located at `src/components/shared/PaymentButton.tsx`

A reusable button component that can be used throughout the website to redirect users to the checkout page with the appropriate category and price.

**Usage:**
```tsx
<PaymentButton 
  category="category-b" 
  transmissionType="manual"
  variant="contained"
  size="large"
>
  Book Category B Course - 700€
</PaymentButton>
```

### 2. BankTransferPayment Component
Located at `src/components/checkout/components/BankTransferPayment.tsx`

A dedicated component for bank transfer payments that displays:
- Bank account details
- Reference number generation
- Copy-to-clipboard functionality
- Payment instructions

### 3. Enhanced PaymentForm Component
Located at `src/components/checkout/components/PaymentForm.tsx`

Updated to include:
- Three payment method options
- Integration with BankTransferPayment component
- Dynamic pricing based on category and transmission type

## Translation Support

The payment system supports three languages:
- **English** (`src/i18n/locales/en.json`)
- **Estonian** (`src/i18n/locales/et.json`)
- **Russian** (`src/i18n/locales/ru.json`)

All payment-related text is properly translated in all three languages.

## Integration Points

### 1. Pricing Section
The pricing section (`src/components/marketing-page/components/Pricing.tsx`) now uses the PaymentButton component for seamless checkout integration.

### 2. Urgency Sections
Urgency sections throughout the website can now include payment buttons with specific category targeting.

### 3. Checkout Flow
The checkout page (`src/pages/CheckoutPage.tsx`) provides a complete payment experience with:
- Address collection
- Payment method selection
- Order review
- Payment confirmation

## Security Features

### 1. Stripe Integration
- Secure card processing
- PCI compliance
- Encrypted data transmission
- Test mode support

### 2. Bank Transfer
- Unique reference number generation
- Copy-to-clipboard functionality
- Clear payment instructions
- Confirmation workflow

## Usage Examples

### Adding a Payment Button to Any Component

```tsx
import PaymentButton from '../shared/PaymentButton';

// Category A (Motorcycle)
<PaymentButton category="category-a">
  Book Motorcycle Course - 570€
</PaymentButton>

// Category B Manual
<PaymentButton category="category-b" transmissionType="manual">
  Book Manual Course - 700€
</PaymentButton>

// Category B Automatic
<PaymentButton category="category-b" transmissionType="automatic">
  Book Automatic Course - 840€
</PaymentButton>

// Category C (Final Course)
<PaymentButton category="category-c">
  Book Final Course - 150€
</PaymentButton>
```

### Customizing Payment Button Appearance

```tsx
<PaymentButton
  category="category-b"
  transmissionType="manual"
  variant="outlined"
  size="large"
  fullWidth
  sx={{ 
    borderRadius: 3,
    fontWeight: 'bold'
  }}
>
  Start Your Journey Today!
</PaymentButton>
```

## Testing

### Stripe Test Mode
The Stripe integration is configured in test mode. Use these test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002

### Bank Transfer Testing
Bank transfer payments are simulated and will show as "pending" status. In production, this would integrate with actual bank transfer tracking.

## Future Enhancements

1. **Real-time Payment Tracking**: Integration with bank APIs for real-time transfer status
2. **Email Notifications**: Automatic email confirmations for payments
3. **Payment History**: User dashboard for payment history
4. **Invoice Generation**: Automatic invoice generation
5. **Multi-currency Support**: Support for additional currencies
6. **Payment Plans**: Installment payment options

## Support

For technical support or questions about the payment integration, please contact the development team.

---

**Last Updated**: December 2024
**Version**: 1.0.0
