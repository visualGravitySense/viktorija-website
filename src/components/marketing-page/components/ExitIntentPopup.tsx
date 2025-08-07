import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const PopupContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  width: '90%',
  maxWidth: 500,
  outline: 'none',
  boxShadow: theme.shadows[24],
  '&:focus': {
    outline: 'none',
  },
}));

const CloseButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
  color: theme.palette.grey[500],
  minWidth: 'auto',
  padding: theme.spacing(1),
}));

interface ExitIntentPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function ExitIntentPopup({ open, onClose }: ExitIntentPopupProps) {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="exit-intent-modal"
      aria-describedby="exit-intent-description"
    >
      <PopupContent>
        <CloseButton onClick={onClose} size="small">
          ×
        </CloseButton>
        
        <Typography
          id="exit-intent-modal"
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ color: 'text.primary', fontWeight: 'bold', pr: 4 }}
        >
          Before You Go: The One-Minute Insight
        </Typography>

        <Typography
          id="exit-intent-description"
          variant="body1"
          sx={{ color: 'text.secondary', mb: 4 }}
        >
          Take our quick assessment to see how much time and revenue you could reclaim with AI-powered operations. 
          No commitment, just eye-opening insights delivered instantly.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ py: 1.5 }}
        >
          Get Instant Assessment →
        </Button>
      </PopupContent>
    </StyledModal>
  );
} 