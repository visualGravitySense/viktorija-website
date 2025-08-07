import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AddressForm from './components/AddressForm.tsx';
import Info from './components/Info.tsx';
import InfoMobile from './components/InfoMobile.tsx';
import PaymentForm from './components/PaymentForm.tsx';
import Review from './components/Review.tsx';
import SitemarkIcon from './components/SitemarkIcon.tsx';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import { StripePaymentProvider } from './services/StripePaymentService.tsx';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

// Create a context to share payment state across components
const CheckoutContext = React.createContext<{
  paymentData: any;
  setPaymentData: (data: any) => void;
  paymentSuccess: boolean;
  setPaymentSuccess: (success: boolean) => void;
}>({
  paymentData: null,
  setPaymentData: () => {},
  paymentSuccess: false,
  setPaymentSuccess: () => {},
});

export const useCheckoutContext = () => React.useContext(CheckoutContext);

export default function Checkout(props: { disableCustomTheme?: boolean }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const steps = [t('checkout.steps.shipping'), t('checkout.steps.payment'), t('checkout.steps.review')];
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [transmissionType, setTransmissionType] = React.useState('manual'); // Default to manual
  const [paymentData, setPaymentData] = React.useState<any>(null);
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  
  const handleClose = () => {
    navigate(-1); // Go back to previous page
  };
  
  // Get category from URL parameters
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || 'default';
  const instructor = searchParams.get('instructor'); // Get selected instructor if any
  
  // Determine price based on category and transmission type
  const getPriceByCategory = () => {
    switch(category) {
      case 'category-a':
        return '570€';
      case 'category-b':
        return transmissionType === 'manual' ? '700€' : '840€';
      case 'category-c':
        return '150€';
      default:
        return '570€'; // Default to category A if not specified
    }
  };
  
  const totalPrice = getPriceByCategory();
  
  // Handle transmission type change
  const handleTransmissionChange = (type: string) => {
    setTransmissionType(type);
  };
  
  // Add function to proceed to next step when payment is successful
  React.useEffect(() => {
    if (activeStep === 1 && paymentSuccess) {
      // After payment is successful, automatically advance to review step after a short delay
      const timer = setTimeout(() => {
        handleNext();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [paymentSuccess, activeStep]);
  
  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review 
          paymentSuccess={paymentSuccess} 
          paymentData={paymentData} 
          orderTotal={totalPrice}
        />;
      default:
        throw new Error('Unknown step');
    }
  }
  
  const contextValue = {
    paymentData,
    setPaymentData,
    paymentSuccess,
    setPaymentSuccess
  };
  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Box sx={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1100 }}>
        <ColorModeIconDropdown />
      </Box>

      <Box sx={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 1100 }}>
        <IconButton
          onClick={handleClose}
          aria-label={t('common.close') || 'Close'}
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <CheckoutContext.Provider value={contextValue}>
        <StripePaymentProvider>
          <Grid
            container
            sx={{
              height: {
                xs: '100%',
                sm: 'calc(100dvh - var(--template-frame-height, 0px))',
              },
              mt: {
                xs: 4,
                sm: 0,
              },
            }}
          >
            <Grid
              size={{ xs: 12, sm: 5, lg: 4 }}
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                backgroundColor: 'background.paper',
                borderRight: { sm: 'none', md: '1px solid' },
                borderColor: { sm: 'none', md: 'divider' },
                alignItems: 'start',
                pt: 16,
                px: 10,
                gap: 4,
              }}
            >
              <SitemarkIcon />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  width: '100%',
                  maxWidth: 500,
                }}
              >
                <Info 
                  totalPrice={totalPrice} 
                  onTransmissionChange={handleTransmissionChange}
                  transmissionType={transmissionType}
                  instructor={instructor}
                />
              </Box>
            </Grid>
            <Grid
              size={{ sm: 12, md: 7, lg: 8 }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '100%',
                width: '100%',
                backgroundColor: { xs: 'transparent', sm: 'background.default' },
                alignItems: 'start',
                pt: { xs: 0, sm: 16 },
                px: { xs: 2, sm: 10 },
                gap: { xs: 4, md: 8 },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { sm: 'space-between', md: 'flex-end' },
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: { sm: '100%', md: 600 },
                }}
              >
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    flexGrow: 1,
                  }}
                >
                  <Stepper
                    id="desktop-stepper"
                    activeStep={activeStep}
                    sx={{ width: '100%', height: 40 }}
                  >
                    {steps.map((label) => (
                      <Step
                        sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
                        key={label}
                      >
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </Box>
              <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
                <CardContent
                  sx={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <Typography variant="subtitle2" gutterBottom>
                      {t('checkout.selected_products')}
                    </Typography>
                    <Typography variant="body1">
                      {totalPrice}
                    </Typography>
                  </div>
                  <InfoMobile 
                    totalPrice={totalPrice} 
                    onTransmissionChange={handleTransmissionChange}
                    transmissionType={transmissionType}
                    instructor={instructor}
                  />
                </CardContent>
              </Card>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  width: '100%',
                  maxWidth: { sm: '100%', md: 600 },
                  maxHeight: '720px',
                  gap: { xs: 5, md: 'none' },
                }}
              >
                <Stepper
                  id="mobile-stepper"
                  activeStep={activeStep}
                  alternativeLabel
                  sx={{ display: { sm: 'flex', md: 'none' } }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ':first-child': { pl: 0 },
                        ':last-child': { pr: 0 },
                        '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                      }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box
                    sx={{
                      mt: { xs: 8, sm: 8 },
                      display: 'flex',
                      justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                      width: '100%',
                    }}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRoundedIcon />}
                        onClick={handleBack}
                        variant="text"
                      >
                        {t('checkout.back')}
                      </Button>
                    )}
                    {activeStep === steps.length - 1 ? (
                      <Button
                        variant="contained"
                        endIcon={<ChevronRightRoundedIcon />}
                        onClick={() => {
                          // Handle order placement/completion here
                          window.location.href = '/';
                        }}
                        sx={{ ml: 'auto' }}
                      >
                        {t('checkout.place_order')}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        endIcon={<ChevronRightRoundedIcon />}
                        onClick={handleNext}
                        sx={{ ml: 'auto' }}
                        disabled={activeStep === 1 && !paymentSuccess}
                      >
                        {activeStep === steps.length - 2
                          ? t('checkout.proceed_to_review')
                          : t('checkout.next')}
                      </Button>
                    )}
                  </Box>
                </React.Fragment>
              </Box>
            </Grid>
          </Grid>
        </StripePaymentProvider>
      </CheckoutContext.Provider>
    </AppTheme>
  );
}
