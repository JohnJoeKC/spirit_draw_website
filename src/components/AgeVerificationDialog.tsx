import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AgeVerificationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onDeny: () => void;
}

const AgeVerificationDialog: React.FC<AgeVerificationDialogProps> = ({
  open,
  onConfirm,
  onDeny,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      open={open}
      onClose={onDeny}
      aria-labelledby="age-verification-dialog-title"
      disableEscapeKeyDown
      sx={{
        '& .MuiDialog-paper': {
          zIndex: 1000,
        },
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: 999,
        },
      }}
      slotProps={{
        backdrop: {
          style: {
            pointerEvents: 'none',
          },
        },
      }}
    >
      <DialogTitle id="age-verification-dialog-title">{t('ageVerificationTitle')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t('ageVerificationPrompt')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDeny} color="primary">
          {t('no')}
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgeVerificationDialog; 