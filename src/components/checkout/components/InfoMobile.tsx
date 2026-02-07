import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Info from './Info';
import { useTranslation } from 'react-i18next';

interface InfoMobileProps {
  totalPrice: string;
  transmissionType?: string;
  onTransmissionChange?: (type: string) => void;
  instructor?: string | null;
}

function InfoMobile({ totalPrice, transmissionType, onTransmissionChange, instructor }: InfoMobileProps) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 'auto', px: 3, pb: 3, pt: 8 }} role="presentation">
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <Info 
        totalPrice={totalPrice} 
        transmissionType={transmissionType}
        onTransmissionChange={onTransmissionChange}
        instructor={instructor}
      />
    </Box>
  );

  return (
    <div>
      <Button
        variant="text"
        endIcon={<ExpandMoreRoundedIcon />}
        onClick={toggleDrawer(true)}
      >
        {t('checkout.view_details')}
      </Button>
      <Drawer
        open={open}
        anchor="top"
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            top: 'var(--template-frame-height, 0px)',
            backgroundImage: 'none',
            backgroundColor: 'background.paper',
            maxHeight: '80vh',
            overflowY: 'auto'
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default InfoMobile;
