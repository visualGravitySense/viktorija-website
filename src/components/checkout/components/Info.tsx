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
import { useTranslation } from 'react-i18next';

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
          desc: t('checkout.products.theory.desc'),
          price: '120€',
        },
        {
          name: t('checkout.products.lessons_a.name'),
          desc: t('checkout.products.lessons.desc'),
          price: '45€',
        },
        {
          name: t('painpoints.total'),
          desc: t('checkout.products.manual.desc'),
          price: '570€',
        }
      ];
    }
  };
  
  // Get instructor info if available
  const getInstructorInfo = () => {
    if (!instructor) return null;
    
    // Map of instructor IDs to their information
    const instructorsMap: Record<string, {name: string, car: string, image: string}> = {
      'igor': {
        name: t('instructors_component.instructors.igor.name'),
        car: 'Toyota Corolla',
        image: '/igor-ready.png'
      },
      'maksim': {
        name: t('instructors_component.instructors.maksim.name'),
        car: 'Volkswagen Golf',
        image: '/maksim-ready.png'
      },
      'stanislav': {
        name: t('instructors_component.instructors.stanislav.name'),
        car: 'Skoda Octavia',
        image: '/stas-ready.png'
      },
      'ivan': {
        name: t('instructors_component.instructors.ivan.name'),
        car: 'Toyota Yaris',
        image: '/ivan-ready.png'
      },
      'andrei': {
        name: t('instructors_component.instructors.andrei.name'),
        car: 'Volkswagen Polo',
        image: '/andrei-ready.png'
      }
    };
    
    return instructorsMap[instructor] || null;
  };
  
  const selectedInstructor = getInstructorInfo();
  
  const products = getProducts();
  const priceValue = parseInt(totalPrice.replace('€', '').trim());
  const isCategoryB = priceValue === 700 || priceValue === 840;
  
  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        {t('checkout.review.total')}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {totalPrice}
      </Typography>
      
      {/* Display selected instructor if available */}
      {selectedInstructor && (
        <Box sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1, border: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            {t('checkout.selected_instructor')}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box 
              component="img"
              src={selectedInstructor.image}
              alt={selectedInstructor.name}
              sx={{ 
                width: 60, 
                height: 60, 
                borderRadius: '50%',
                objectFit: 'cover',
                bgcolor: 'action.selected' 
              }}
            />
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {selectedInstructor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedInstructor.car}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      
      <List disablePadding>
        {products.map((product, index) => (
          <ListItem 
            key={`${product.name}-${index}`} 
            sx={{ 
              py: 1, 
              px: 0,
              flexDirection: product.price ? 'row' : 'column',
              alignItems: product.price ? 'center' : 'flex-start'
            }}
          >
            {product.price ? (
              <>
                <ListItemText
                  sx={{ mr: 2 }}
                  primary={product.name}
                  secondary={product.desc}
                />
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {product.price}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', width: '100%' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ width: '100%' }}>
                  {product.desc}
                </Typography>
              </>
            )}
          </ListItem>
        ))}
        
        {/* Transmission selection for Category B */}
        {isCategoryB && (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {t('checkout.transmission_type')}
            </Typography>
            <RadioGroup
              value={transmissionType}
              onChange={handleTransmissionChange}
              name="transmission-type-group"
            >
              <FormControlLabel 
                value="manual"
                control={<Radio />} 
                label={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <Typography>{t('checkout.manual_transmission')}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium', ml: 2 }}>700€</Typography>
                  </Box>
                }
              />
              <FormControlLabel 
                value="automatic"
                control={<Radio />} 
                label={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <Typography>{t('checkout.automatic_transmission')}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 'medium', ml: 2 }}>840€</Typography>
                  </Box>
                }
              />
            </RadioGroup>
            
            {/* Teacher information for Category B */}
            <Box sx={{ mt: 3, p: 2, bgcolor: 'background.default', borderRadius: 1, border: 1, borderColor: 'divider' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {t('checkout.your_instructor')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box 
                  component="img"
                  src="/instructor-avatar.jpg"
                  alt="Instructor"
                  sx={{ 
                    width: 60, 
                    height: 60, 
                    borderRadius: '50%',
                    objectFit: 'cover',
                    bgcolor: 'action.selected' 
                  }}
                />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                    Andrei Smirnov
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t('checkout.experienced_instructor')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </List>
      
      <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={isGift} 
              onChange={handleGiftChange}
              icon={<CardGiftcardIcon color="action" />}
              checkedIcon={<CardGiftcardIcon color="primary" />}
            />
          }
          label={t('checkout.make_gift')}
        />
        {isGift && (
          <Box sx={{ pl: 4, mt: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t('checkout.gift_message')}
            </Typography>
            
            <TextField
              fullWidth
              margin="dense"
              label={t('checkout.recipient_email')}
              variant="outlined"
              value={giftEmail}
              onChange={handleGiftEmailChange}
              error={!!emailError}
              helperText={emailError}
              placeholder={t('checkout.recipient_email_placeholder')}
              size="small"
              sx={{ mb: 1 }}
            />
          </Box>
        )}
      </Box>
    </React.Fragment>
  );
}

export default Info;
