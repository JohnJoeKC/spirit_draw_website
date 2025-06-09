import React from 'react';
import { Button, ButtonProps } from '@mui/material';

// Define the props for the SecondaryButton component
interface SecondaryButtonProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  sx?: ButtonProps['sx'];
  // Allow any other ButtonProps
  [key: string]: any;
}

/**
 * SecondaryButton - A reusable button component with consistent styling
 * for secondary actions throughout the application.
 */
const SecondaryButton: React.FC<SecondaryButtonProps> = ({ 
  children, 
  size = 'large', 
  fullWidth = false, 
  type = 'button',
  disabled = false,
  onClick,
  sx,
  ...props 
}) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      size={size}
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
      onClick={onClick}
      sx={{
        borderRadius: 2,
        py: size === 'large' ? 1.5 : 1,
        px: size === 'large' ? 4 : 3,
        textTransform: 'none',
        fontWeight: 600,
        borderWidth: 1.5,
        '&:hover': {
          borderWidth: 1.5,
          backgroundColor: 'rgba(25, 118, 210, 0.04)'
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SecondaryButton; 