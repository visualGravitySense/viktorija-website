import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import PaymentIcon from '@mui/icons-material/Payment';
import HelpIcon from '@mui/icons-material/Help';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import LanguageSwitcher from '../../shared-theme/LanguageSwitcher';
import Sitemark from './SitemarkIcon';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@mui/material/useMediaQuery';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '8px 10px',
  },
}));

const ContactBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px 0',
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
  width: '100%',
}));

interface AppAppBarProps {
  toggleColorMode?: () => void;
}

export default function AppAppBar({ toggleColorMode }: AppAppBarProps) {
  const [open, setOpen] = React.useState(false);
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
    if (!newOpen) {
      setExpandedSection(null);
    }
  };

  const handleSectionClick = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const menuItems = [
    {
      title: t('navigation.services'),
      icon: <DirectionsCarIcon />,
      items: [
        { text: t('navigation.theory'), href: '/theory' },
        { text: t('navigation.practical'), href: '/practical' },
        { text: t('navigation.exam_preparation'), href: '/exam-prep' },
      ],
    },
    {
      title: t('navigation.schedule'),
      icon: <EventIcon />,
      items: [
        { text: t('navigation.book_lesson'), href: '/book' },
        { text: t('navigation.view_schedule'), href: '/schedule' },
      ],
    },
    {
      title: t('navigation.prices'),
      icon: <PaymentIcon />,
      items: [
        { text: t('navigation.packages'), href: '/packages' },
        { text: t('navigation.payment'), href: '/payment' },
      ],
    },
  ];

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
        [theme.breakpoints.down('sm')]: {
          mt: 'calc(var(--template-frame-height, 0px) + 16px)',
        },
      }}
    >
      <Container maxWidth="lg">
        {/* Contact Bar */}
        <ContactBar sx={{ display: { xs: 'none', md: 'flex' }, mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <PhoneIcon fontSize="small" />
              <Link href="tel:+37253464508" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                +372 53464508
              </Link>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <EmailIcon fontSize="small" />
              <Link href="mailto:viktorijaautokool@hot.ee" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                viktorijaautokool@hot.ee
              </Link>
            </Stack>
          </Box>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <FacebookIcon fontSize="small" />
            <Link href="https://www.facebook.com/viktorija.autokool" target="_blank" rel="noopener noreferrer" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
              Facebook
            </Link>
          </Stack>
        </ContactBar>

        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark />
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                ml: 2,
                gap: 0.5,
              }}
            >
              <Button
                variant="text"
                color="primary"
                size="small"
                component={RouterLink}
                to="/"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {t('navigation.home')}
              </Button>
              <Button
                variant="text"
                color="primary"
                size="small"
                component={RouterLink}
                to="/features"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {t('navigation.services')}
              </Button>
              <Button
                variant="text"
                color="primary"
                size="small"
                component={RouterLink}
                to="/about"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {t('navigation.about')}
              </Button>
              <Button 
                variant="text" 
                color="primary" 
                size="small"
                component={Link}
                href="#testimonials"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {t('navigation.reviews')}
              </Button>
              <Button 
                variant="text" 
                color="primary" 
                size="small"
                component={Link}
                href="#pricing"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {t('navigation.prices')}
              </Button>
              <Button 
                variant="text" 
                color="primary" 
                size="small"
                component={Link}
                href="#faq"
                sx={{ 
                  textDecoration: 'none',
                  '&:hover': { 
                    textDecoration: 'none',
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {t('navigation.questions')}
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <LanguageSwitcher />
            <Button 
              color="primary" 
              variant="outlined" 
              size="small"
              component={RouterLink}
              to="/checkout?category=category-c"
              sx={{
                fontWeight: 600,
                '&:hover': {
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              {t('navigation.signin')}
            </Button>
            <Button 
              color="primary" 
              variant="contained" 
              size="small"
              component={RouterLink}
              to="/checkout?category=category-b"
              sx={{
                fontWeight: 600,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 10px rgba(25, 118, 210, 0.3)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              {t('navigation.signup')}
            </Button>
            <ColorModeIconDropdown />
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, alignItems: 'center' }}>
            <LanguageSwitcher />
            <ColorModeIconDropdown />
            <IconButton 
              aria-label="Menu button" 
              onClick={toggleDrawer(true)}
              color="primary"
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  width: { xs: '100%', sm: '400px' },
                  maxWidth: '100%',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Sitemark />
                  <IconButton onClick={toggleDrawer(false)} color="primary">
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {/* Quick Contact Actions */}
                <Box sx={{ mb: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<PhoneIcon />}
                    href="tel:+37253464508"
                    sx={{ 
                      mb: 1,
                      fontWeight: 600,
                      minHeight: 48,
                      fontSize: '1rem',
                      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 10px rgba(25, 118, 210, 0.3)',
                        transition: 'all 0.2s ease-in-out'
                      },
                      '&:active': {
                        transform: 'translateY(0px)',
                        transition: 'all 0.1s ease-in-out'
                      }
                    }}
                  >
                    {t('navigation.call_now')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    startIcon={<EventIcon />}
                    component={RouterLink}
                    to="/book"
                    sx={{
                      fontWeight: 600,
                      minHeight: 48,
                      fontSize: '1rem',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        transition: 'all 0.2s ease-in-out'
                      },
                      '&:active': {
                        transform: 'translateY(0px)',
                        transition: 'all 0.1s ease-in-out'
                      }
                    }}
                  >
                    {t('navigation.book_lesson')}
                  </Button>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Main Navigation */}
                <List component="nav" sx={{ flexGrow: 1 }}>
                  {menuItems.map((section) => (
                    <React.Fragment key={section.title}>
                      <ListItem
                        onClick={() => handleSectionClick(section.title)}
                        sx={{
                          borderRadius: 1,
                          mb: 0.5,
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          },
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {section.icon}
                        </ListItemIcon>
                        <ListItemText primary={section.title} />
                        {expandedSection === section.title ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={expandedSection === section.title} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {section.items.map((item) => (
                            <ListItem
                              key={item.text}
                              component={RouterLink}
                              to={item.href}
                              onClick={toggleDrawer(false)}
                              sx={{
                                pl: 4,
                                borderRadius: 1,
                                '&:hover': {
                                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                                },
                              }}
                            >
                              <ListItemText primary={item.text} />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </React.Fragment>
                  ))}

                  <ListItem
                    component={Link}
                    href="#faq"
                    onClick={toggleDrawer(false)}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <HelpIcon />
                    </ListItemIcon>
                    <ListItemText primary={t('navigation.questions')} />
                  </ListItem>
                </List>

                <Divider sx={{ my: 2 }} />

                {/* Contact Information */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {t('navigation.contacts')}:
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <PhoneIcon fontSize="small" />
                    <Link href="tel:+37253464508" sx={{ color: 'text.primary' }}>
                      +372 53464508
                    </Link>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <EmailIcon fontSize="small" />
                    <Link href="mailto:viktorijaautokool@hot.ee" sx={{ color: 'text.primary' }}>
                      viktorijaautokool@hot.ee
                    </Link>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <FacebookIcon fontSize="small" />
                    <Link href="https://www.facebook.com/viktorija.autokool" target="_blank" rel="noopener noreferrer" sx={{ color: 'text.primary' }}>
                      Facebook
                    </Link>
                  </Stack>
                </Box>

                {/* Auth Buttons */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button 
                    color="primary" 
                    variant="outlined" 
                    fullWidth
                    component={RouterLink}
                    to="/checkout?category=category-c"
                    sx={{
                      fontWeight: 600,
                      minHeight: 48,
                      fontSize: '1rem',
                      '&:hover': {
                        transform: 'translateY(-1px)',
                        transition: 'all 0.2s ease-in-out'
                      },
                      '&:active': {
                        transform: 'translateY(0px)',
                        transition: 'all 0.1s ease-in-out'
                      }
                    }}
                  >
                    {t('navigation.signin')}
                  </Button>
                  <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth
                    component={RouterLink}
                    to="/checkout?category=category-b"
                    sx={{
                      fontWeight: 600,
                      minHeight: 48,
                      fontSize: '1rem',
                      background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1565c0 30%, #1976d2 90%)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 2px 10px rgba(25, 118, 210, 0.3)',
                        transition: 'all 0.2s ease-in-out'
                      },
                      '&:active': {
                        transform: 'translateY(0px)',
                        transition: 'all 0.1s ease-in-out'
                      }
                    }}
                  >
                    {t('navigation.signup')}
                  </Button>
                </Box>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
