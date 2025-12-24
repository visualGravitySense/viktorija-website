import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';

const BankDetailsCard = styled(Card)(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[4],
  },
}));

const DetailRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const CopyButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
}));

interface BankTransferPaymentProps {
  amount: string;
  onPaymentInitiated: () => void;
}

export default function BankTransferPayment({ amount, onPaymentInitiated }: BankTransferPaymentProps) {
  const { t } = useTranslation();
  const [copiedField, setCopiedField] = React.useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = React.useState<string>('');

  // Estonian bank account details for VIKTORIJA AUTOKOOL OSAÜHING
  const bankDetails = {
    accountHolder: 'VIKTORIJA AUTOKOOL OSAÜHING',
    accountNumber: 'EE871010220059959011',
    bankName: 'SEB Pank',
    bankCode: '1010',
  };

  // Generate reference number if not exists
  React.useEffect(() => {
    if (!referenceNumber) {
      const timestamp = Date.now().toString().slice(-8);
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      setReferenceNumber(`VIK${timestamp}${random}`);
    }
  }, [referenceNumber]);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handlePaymentInitiated = () => {
    onPaymentInitiated();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Alert
        severity="info"
        icon={<WarningRoundedIcon fontSize="small" />}
        sx={{ mb: 2 }}
      >
        {t('checkout.payment.payment_instructions_text')}
      </Alert>

      <BankDetailsCard>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AccountBalanceRoundedIcon sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h3">
              {t('checkout.payment.bank_account_details')}
            </Typography>
          </Box>

          <DetailRow>
            <Typography variant="body2" color="text.secondary">
              {t('checkout.payment.account_holder')}:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'medium' }}>
                {bankDetails.accountHolder}
              </Typography>
              <CopyButton
                size="small"
                onClick={() => copyToClipboard(bankDetails.accountHolder, 'accountHolder')}
                color={copiedField === 'accountHolder' ? 'success' : 'default'}
              >
                <ContentCopyIcon fontSize="small" />
              </CopyButton>
            </Box>
          </DetailRow>

          <DetailRow>
            <Typography variant="body2" color="text.secondary">
              {t('checkout.payment.account_number')}:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'medium' }}>
                {bankDetails.accountNumber}
              </Typography>
              <CopyButton
                size="small"
                onClick={() => copyToClipboard(bankDetails.accountNumber, 'accountNumber')}
                color={copiedField === 'accountNumber' ? 'success' : 'default'}
              >
                <ContentCopyIcon fontSize="small" />
              </CopyButton>
            </Box>
          </DetailRow>

          <DetailRow>
            <Typography variant="body2" color="text.secondary">
              {t('checkout.payment.bank_name')}:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              {bankDetails.bankName}
            </Typography>
          </DetailRow>

          <DetailRow>
            <Typography variant="body2" color="text.secondary">
              {t('checkout.payment.reference_number')}:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 'medium', color: 'primary.main' }}>
                {referenceNumber}
              </Typography>
              <CopyButton
                size="small"
                onClick={() => copyToClipboard(referenceNumber, 'reference')}
                color={copiedField === 'reference' ? 'success' : 'default'}
              >
                <ContentCopyIcon fontSize="small" />
              </CopyButton>
            </Box>
          </DetailRow>

          <DetailRow>
            <Typography variant="body2" color="text.secondary">
              {t('checkout.total')}:
            </Typography>
            <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
              {amount}
            </Typography>
          </DetailRow>
        </CardContent>
      </BankDetailsCard>

      <Paper sx={{ p: 3, backgroundColor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          {t('checkout.payment.payment_confirmation')}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t('checkout.payment.payment_confirmation_text')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePaymentInitiated}
          startIcon={<CheckCircleOutlineRoundedIcon />}
          fullWidth
        >
          {t('checkout.payment.confirm_payment')}
        </Button>
      </Paper>

      {copiedField && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {t('checkout.payment.copied')}
        </Alert>
      )}
    </Box>
  );
}
