import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const { t } = useTranslation();
  
  // Form state
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'Eesti',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isValid, setIsValid] = React.useState(false);

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    validateForm();
  };

  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Eesnimi on kohustuslik';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Perekonnanimi on kohustuslik';
    }
    
    if (!formData.address1.trim()) {
      newErrors.address1 = 'Aadress on kohustuslik';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'Linn on kohustuslik';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'Maakond on kohustuslik';
    }
    
    if (!formData.zip.trim()) {
      newErrors.zip = 'Postiindeks on kohustuslik';
    } else if (!/^\d{5}$/.test(formData.zip)) {
      newErrors.zip = 'Postiindeks peab olema 5-kohaline number';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefoninumber on kohustuslik';
    } else if (!/^(\+372|372)?[0-9]{7,8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Palun sisestage kehtiv Eesti telefoninumber';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-posti aadress on kohustuslik';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Palun sisestage kehtiv e-posti aadress';
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  // Validate on form data change
  React.useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header with Instructions */}
      <Card sx={{ mb: 4, bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <InfoIcon color="info" />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'info.main' }}>
              📝 Kontaktandmed
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Palun täitke oma kontaktandmed, et saaksime teiega ühendust võtta ja kinnitada registreerimise.
            Kõik väljad on kohustuslikud.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* First Name */}
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="first-name" required sx={{ mb: 1, fontWeight: 'medium' }}>
            {t('checkout.address.first_name')}
          </FormLabel>
          <TextField
            id="first-name"
            name="first-name"
            type="text"
            placeholder={t('checkout.address.first_name_placeholder')}
            autoComplete="given-name"
            required
            size="medium"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </FormGrid>

        {/* Last Name */}
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="last-name" required sx={{ mb: 1, fontWeight: 'medium' }}>
            {t('checkout.address.last_name')}
          </FormLabel>
          <TextField
            id="last-name"
            name="last-name"
            type="text"
            placeholder={t('checkout.address.last_name_placeholder')}
            autoComplete="family-name"
            required
            size="medium"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </FormGrid>

        {/* Phone Number */}
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="phone" required sx={{ mb: 1, fontWeight: 'medium' }}>
            Telefoninumber
          </FormLabel>
          <TextField
            id="phone"
            name="phone"
            type="tel"
            placeholder="+372 5123 4567"
            autoComplete="tel"
            required
            size="medium"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone || 'Sisestage oma telefoninumber'}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </FormGrid>

        {/* Email */}
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="email" required sx={{ mb: 1, fontWeight: 'medium' }}>
            E-posti aadress
          </FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            placeholder="teie@email.ee"
            autoComplete="email"
            required
            size="medium"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email || 'Saadame kinnituse e-postile'}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </FormGrid>

        {/* Address Line 1 */}
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="address1" required sx={{ mb: 1, fontWeight: 'medium' }}>
            {t('checkout.address.address_line1')}
          </FormLabel>
          <TextField
            id="address1"
            name="address1"
            type="text"
            placeholder={t('checkout.address.address_line1_placeholder')}
            autoComplete="street-address"
            required
            size="medium"
            value={formData.address1}
            onChange={(e) => handleInputChange('address1', e.target.value)}
            error={!!errors.address1}
            helperText={errors.address1}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </FormGrid>

        {/* Address Line 2 */}
        <FormGrid size={{ xs: 12 }}>
          <FormLabel htmlFor="address2" sx={{ mb: 1, fontWeight: 'medium' }}>
            {t('checkout.address.address_line2')}
          </FormLabel>
          <TextField
            id="address2"
            name="address2"
            type="text"
            placeholder={t('checkout.address.address_line2_placeholder')}
            autoComplete="street-address-line2"
            size="medium"
            value={formData.address2}
            onChange={(e) => handleInputChange('address2', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </FormGrid>

        {/* City */}
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="city" required sx={{ mb: 1, fontWeight: 'medium' }}>
            {t('checkout.address.city')}
          </FormLabel>
          <TextField
            id="city"
            name="city"
            type="text"
            placeholder={t('checkout.address.city_placeholder')}
            autoComplete="address-level2"
            required
            size="medium"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            error={!!errors.city}
            helperText={errors.city}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </FormGrid>

        {/* State/County */}
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="state" required sx={{ mb: 1, fontWeight: 'medium' }}>
            {t('checkout.address.state')}
          </FormLabel>
          <TextField
            id="state"
            name="state"
            type="text"
            placeholder={t('checkout.address.state_placeholder')}
            autoComplete="address-level1"
            required
            size="medium"
            value={formData.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            error={!!errors.state}
            helperText={errors.state}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </FormGrid>

        {/* ZIP Code */}
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="zip" required sx={{ mb: 1, fontWeight: 'medium' }}>
            {t('checkout.address.zip')}
          </FormLabel>
          <TextField
            id="zip"
            name="zip"
            type="text"
            placeholder="12345"
            autoComplete="postal-code"
            required
            size="medium"
            value={formData.zip}
            onChange={(e) => handleInputChange('zip', e.target.value)}
            error={!!errors.zip}
            helperText={errors.zip || '5-kohaline postiindeks'}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </FormGrid>

        {/* Country */}
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel htmlFor="country" required sx={{ mb: 1, fontWeight: 'medium' }}>
            {t('checkout.address.country')}
          </FormLabel>
          <TextField
            id="country"
            name="country"
            type="text"
            value={formData.country}
            autoComplete="country-name"
            required
            size="medium"
            disabled
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'grey.100',
                '&.Mui-disabled': {
                  bgcolor: 'grey.100',
                },
              },
            }}
          />
        </FormGrid>
      </Grid>

      {/* Form Status */}
      <Box sx={{ mt: 4 }}>
        {isValid ? (
          <Alert 
            icon={<CheckCircleIcon />} 
            severity="success"
            sx={{ 
              '& .MuiAlert-message': { 
                fontWeight: 'medium' 
              } 
            }}
          >
            Kõik väljad on korrektselt täidetud! Võite minna edasi makseteabe juurde.
          </Alert>
        ) : (
          <Alert 
            icon={<InfoIcon />} 
            severity="info"
            sx={{ 
              '& .MuiAlert-message': { 
                fontWeight: 'medium' 
              } 
            }}
          >
            Palun täitke kõik kohustuslikud väljad, et minna edasi.
          </Alert>
        )}
      </Box>

      {/* Privacy Notice */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary" align="center">
          🔒 Teie andmed on turvalised ja neid kasutatakse ainult registreerimise eesmärgil. 
          Meie privaatsuspoliitika tagab teie andmete kaitse.
        </Typography>
      </Box>
    </Box>
  );
}
