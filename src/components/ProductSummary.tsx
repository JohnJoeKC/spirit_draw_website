import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

interface ProductSummaryProps {
  image: string;
  name: string;
  county: string;
  spiritType: string;
  description: string;
  link: string;
}

const CARD_HEIGHT = 380;
const IMAGE_BOX_HEIGHT = 200;

const ProductSummary: React.FC<ProductSummaryProps> = ({ image, name, county, spiritType, description, link }) => {
  return (
    <Card className="flex flex-col h-full" style={{ height: CARD_HEIGHT }}>
      <Box
        className="flex items-start justify-center w-full cursor-pointer"
        style={{ height: IMAGE_BOX_HEIGHT, background: 'transparent' }}
        onClick={() => window.open(link, '_blank')}
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
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div" 
          style={{ textTransform: 'capitalize', fontSize: '1.2rem', cursor: 'pointer' }}
          onClick={() => window.open(link, '_blank')}
        >
          {name}
        </Typography>
        <Typography gutterBottom variant="body2" color="text.secondary">
          {county} | {spiritType}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ minHeight: '108px' }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductSummary; 