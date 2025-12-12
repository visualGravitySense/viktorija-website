import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';
import { trackButtonClick } from '../../../lib/analytics';

interface FAQProps {
  title?: string;
}

export default function FAQ({ 
  title
}: FAQProps) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [visibleItems, setVisibleItems] = React.useState(4);

  // Create FAQ items using translations
  const items = [
    {
      id: 'panel1',
      question: t('faq.question1'),
      answer: t('faq.answer1')
    },
    {
      id: 'panel2',
      question: t('faq.question2'),
      answer: t('faq.answer2')
    },
    {
      id: 'panel3',
      question: t('faq.question3'),
      answer: t('faq.answer3')
    },
    {
      id: 'panel4',
      question: t('faq.question4'),
      answer: t('faq.answer4')
    },
    {
      id: 'panel5',
      question: t('faq.question5'),
      answer: t('faq.answer5')
    },
    {
      id: 'panel6',
      question: t('faq.question6'),
      answer: t('faq.answer6')
    }
  ];

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(
        isExpanded
          ? [...expanded, panel]
          : expanded.filter((item) => item !== panel),
      );
    };

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + 4);
  };

  const hasMoreItems = visibleItems < items.length;
  const translatedTitle = title || t('faq.title');

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        sx={{
          color: 'text.primary',
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        {translatedTitle}
      </Typography>
      <Box sx={{ width: '100%' }}>
        {items.slice(0, visibleItems).map((item) => (
          <Accordion
            key={item.id}
            expanded={expanded.includes(item.id)}
            onChange={handleChange(item.id)}
            sx={{
              mb: 2,
              '&:before': {
                display: 'none',
              },
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              borderRadius: '8px !important',
              '&:hover': {
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
              sx={{
                '& .MuiAccordionSummary-content': {
                  my: 2,
                },
              }}
            >
              <Typography component="span" variant="subtitle1" sx={{ fontWeight: 500 }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body1"
                sx={{ 
                  maxWidth: { sm: '100%', md: '70%' },
                  color: 'text.secondary',
                  lineHeight: 1.6,
                }}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', mt: 4 }}>
        {hasMoreItems && (
          <Button
            variant="outlined"
            onClick={() => {
              trackButtonClick('faq_load_more', 'info', 'faq', t('faq.show_more'));
              handleLoadMore();
            }}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {t('faq.show_more')}
          </Button>
        )}
        <Button
          variant="outlined"
          size="large"
          startIcon={<EmailIcon />}
          href="mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli"
          onClick={() => trackButtonClick(
            'faq_email',
            'info',
            'faq',
            t('common.send_email'),
            'mailto:viktorijaautokool@hot.ee?subject=Registratsioon%20autokooli'
          )}
          sx={{
            px: 4,
            py: 1.5,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            }
          }}
          >
            {t('common.send_email')}
          </Button>
      </Box>
    </Container>
  );
}
