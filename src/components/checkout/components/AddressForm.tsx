import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AddressForm() {
  const { t } = useTranslation();
  
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="first-name" required>
          {t('checkout.address.first_name')}
        </FormLabel>
        <OutlinedInput
          id="first-name"
          name="first-name"
          type="name"
          placeholder={t('checkout.address.first_name_placeholder')}
          autoComplete="first name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="last-name" required>
          {t('checkout.address.last_name')}
        </FormLabel>
        <OutlinedInput
          id="last-name"
          name="last-name"
          type="last-name"
          placeholder={t('checkout.address.last_name_placeholder')}
          autoComplete="last name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address1" required>
          {t('checkout.address.address_line1')}
        </FormLabel>
        <OutlinedInput
          id="address1"
          name="address1"
          type="address1"
          placeholder={t('checkout.address.address_line1_placeholder')}
          autoComplete="shipping address-line1"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="address2">
          {t('checkout.address.address_line2')}
        </FormLabel>
        <OutlinedInput
          id="address2"
          name="address2"
          type="address2"
          placeholder={t('checkout.address.address_line2_placeholder')}
          autoComplete="shipping address-line2"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          {t('checkout.address.city')}
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="city"
          placeholder={t('checkout.address.city_placeholder')}
          autoComplete="City"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="state" required>
          {t('checkout.address.state')}
        </FormLabel>
        <OutlinedInput
          id="state"
          name="state"
          type="state"
          placeholder={t('checkout.address.state_placeholder')}
          autoComplete="State"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          {t('checkout.address.zip')}
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder={t('checkout.address.zip_placeholder')}
          autoComplete="shipping postal-code"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="country" required>
          {t('checkout.address.country')}
        </FormLabel>
        <OutlinedInput
          id="country"
          name="country"
          type="country"
          placeholder={t('checkout.address.country_placeholder')}
          autoComplete="shipping country"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label={t('checkout.address.use_shipping_address')}
        />
      </FormGrid>
    </Grid>
  );
}
