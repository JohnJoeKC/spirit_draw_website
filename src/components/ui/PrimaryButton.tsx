import React from 'react';
import { Button, ButtonProps } from '@mui/material';

// Define the props for the PrimaryButton component
interface PrimaryButtonProps {
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
 * PrimaryButton - A reusable button component with consistent styling
 * for primary actions throughout the application.
 */
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
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
      variant="contained"
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
        boxShadow: 2,
        '&:hover': {
          boxShadow: 4,
        },
        ...sx
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton; 