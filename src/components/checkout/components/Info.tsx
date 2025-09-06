import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SupportIcon from '@mui/icons-material/Support';
import SecurityIcon from '@mui/icons-material/Security';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { Stack, Grid } from '@mui/material';

interface Product {
  name: string;
  desc: string;
  price: string;
}

interface InfoProps {
  totalPrice: string;
  transmissionType?: string;
  onTransmissionChange?: (type: string) => void;
  instructor?: string | null;
}

function Info({ totalPrice, transmissionType = 'manual', onTransmissionChange, instructor }: InfoProps) {
  const { t } = useTranslation();
  const [isGift, setIsGift] = React.useState(false);
  const [giftEmail, setGiftEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  
  const handleGiftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsGift(event.target.checked);
    if (!event.target.checked) {
      setGiftEmail('');
      setEmailError('');
    }
  };
  
  const handleGiftEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setGiftEmail(email);
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      setEmailError(t('checkout.invalid_email'));
    } else {
      setEmailError('');
    }
  };
  
  const handleTransmissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onTransmissionChange) {
      onTransmissionChange(event.target.value);
    }
  };
  
  // Determine which products to show based on the totalPrice
  const getProducts = (): Product[] => {
    // Extract numeric value from price string (removing the € symbol)
    const priceValue = parseInt(totalPrice.replace('€', '').trim());
    
    if (priceValue === 150) {
      // Category C - Final course
      return [
        {
          name: t('checkout.products.final_course.name'),
          desc: t('checkout.products.final_course.desc'),
          price: '150€',
        },
        {
          name: t('painpoints.categories.c.title'),
          desc: t('painpoints.categories.c.description'),
          price: '',
        },
        {
          name: t('painpoints.categories.c.final_label'),
          desc: t('painpoints.categories.c.after_price'),
          price: '150€',
        }
      ];
    } else if (priceValue === 700 || priceValue === 840) {
      // Category B
      return [
        {
          name: t('painpoints.categories.b.title'),
          desc: t('painpoints.categories.b.description'),
          price: '',
        },
        // The transmission price will be shown separately with radio buttons
      ];
    } else {
      // Category A (default)
      return [
        {
          name: t('painpoints.categories.a.title'),
          desc: t('painpoints.categories.a.description'),
          price: '',
        },
        {
          name: t('checkout.products.theory_a.name'),
          desc: t('checkout.products.theory_a.desc'),
          price: '150€',
        },
        {
          name: t('checkout.products.lessons_a.name'),
          desc: t('checkout.products.lessons_a.desc'),
          price: '420€',
        },
        {
          name: t('checkout.products.manual_a.name'),
          desc: t('checkout.products.manual_a.desc'),
          price: '',
        }
      ];
    }
  };

  // Testimonials data
  const testimonials = [
    {
      text: "Suurepärane kogemus! Sain juhiloa esimese korraga.",
      author: "Maria K.",
      rating: 5
    },
    {
      text: "Instruktorid on väga professionaalsed ja kannatlikud.",
      author: "Jaan T.",
      rating: 5
    },
    {
      text: "Soovitan kõigile, kes tahavad kvaliteetset õpet.",
      author: "Anna L.",
      rating: 5
    }
  ];

  // Benefits data
  const benefits = [
    { icon: <CheckCircleIcon color="success" />, text: "Kogenud instruktorid" },
    { icon: <CheckCircleIcon color="success" />, text: "Kaasaegsed õppeautod" },
    { icon: <CheckCircleIcon color="success" />, text: "Individuaalne lähenemine" },
    { icon: <CheckCircleIcon color="success" />, text: "Paindlik ajakava" },
    { icon: <CheckCircleIcon color="success" />, text: "Garantitud tulemus" },
    { icon: <CheckCircleIcon color="success" />, text: "24/7 tugi" }
  ];

  const products = getProducts();
  
  return (
    <Stack spacing={4}>
      {/* Enhanced Product Summary */}
      <Card sx={{ bgcolor: 'primary.50', border: '2px solid', borderColor: 'primary.200' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            🎯 Valitud pakett
          </Typography>
          <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>
            {totalPrice}
          </Typography>
          
          <List disablePadding>
            {products.map((product, index) => (
              <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />
                      <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                        {product.name}
                      </Typography>
                    </Box>
                  }
                  secondary={product.desc}
                />
                {product.price && (
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {product.price}
                  </Typography>
                )}
              </ListItem>
            ))}
          </List>

          {/* Transmission Type Selection for Category B */}
          {(totalPrice === '700€' || totalPrice === '840€') && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                {t('checkout.transmission_type')}
              </Typography>
              <RadioGroup
                value={transmissionType}
                onChange={handleTransmissionChange}
                sx={{ mt: 1 }}
              >
                <FormControlLabel
                  value="manual"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <Typography>Manuaalkäigukast</Typography>
                      <Chip label="700€" color="primary" variant="outlined" />
                    </Box>
                  }
                />
                <FormControlLabel
                  value="automatic"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <Typography>Automaatkäigukast</Typography>
                      <Chip label="840€" color="primary" variant="outlined" />
                    </Box>
                  }
                />
              </RadioGroup>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            ✨ Miks valida Viktorija Autokool?
          </Typography>
          <Grid container spacing={2}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {benefit.icon}
                  <Typography variant="body2">{benefit.text}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Testimonials Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            💬 Õpilaste arvamused
          </Typography>
          <Stack spacing={2}>
            {testimonials.map((testimonial, index) => (
              <Box key={index} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: 'warning.main', fontSize: 18 }} />
                  ))}
                </Box>
                <Typography variant="body2" sx={{ fontStyle: 'italic', mb: 1 }}>
                  "{testimonial.text}"
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  — {testimonial.author}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Trust Indicators */}
      <Card sx={{ bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'success.main', mb: 2 }}>
            🔒 Turvaline ja usaldusväärne
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <SecurityIcon color="success" />
                <Typography variant="body2">SSL krüptitud makse</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <SupportIcon color="primary" />
                <Typography variant="body2">24/7 klienditugi</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocalShippingIcon color="info" />
                <Typography variant="body2">Kiire registreerimine</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <CheckCircleIcon color="success" />
                <Typography variant="body2">Garantitud kvaliteet</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Gift Option */}
      <Card>
        <CardContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={isGift}
                onChange={handleGiftChange}
                icon={<CardGiftcardIcon />}
                checkedIcon={<CardGiftcardIcon />}
              />
            }
            label={
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {t('checkout.make_gift')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('checkout.gift_message')}
                </Typography>
              </Box>
            }
          />
          
          {isGift && (
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label={t('checkout.recipient_email')}
                placeholder={t('checkout.recipient_email_placeholder')}
                value={giftEmail}
                onChange={handleGiftEmailChange}
                error={!!emailError}
                helperText={emailError}
                size="small"
              />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            ❓ Korduma kippuvad küsimused
          </Typography>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Kui kaua kestab kursus?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Täielik kursus võtab aega 2-3 kuud, sõltuvalt teie ajakavast ja õpitulemustest.
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Kas saan valida instruktori?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Jah, võite valida oma lemmikinstruktori või meie soovitame teile parima võimaluse.
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Mis juhtub, kui ei sobi?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pakume 100% rahulolevuse garantiid. Kui ei ole rahul, tagastame raha.
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

export default Info;
