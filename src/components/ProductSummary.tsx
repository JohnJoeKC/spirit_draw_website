import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface ProductSummaryProps {
  image: string;
  name: string;
  county: string;
  spiritType: string;
  description: string;
}

const CARD_HEIGHT = 380;
const IMAGE_BOX_HEIGHT = 200;

const ProductSummary: React.FC<ProductSummaryProps> = ({ image, name, county, spiritType, description }) => {
  return (
    <Card className="flex flex-col h-full" style={{ height: CARD_HEIGHT }}>
      <Box
        className="flex items-start justify-center w-full"
        style={{ height: IMAGE_BOX_HEIGHT, background: 'transparent' }}
      >
        <img
          src={image}
          alt={`${county} ${spiritType}`}
          style={{
            maxHeight: IMAGE_BOX_HEIGHT - 24,
            maxWidth: '100%',
            objectFit: 'contain',
            marginTop: 'auto',
            marginBottom: 0,
            display: 'block',
          }}
        />
      </Box>
      <CardContent className="flex flex-col flex-grow justify-end">
        <Typography gutterBottom variant="h6" component="div" style={{ textTransform: 'capitalize' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {county} | {spiritType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductSummary; 