import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductSummary from './ProductSummary';
import prizes from '../data/prizes.json';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Custom arrow components
const arrowStyle = {
  position: 'absolute' as const,
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
  background: 'white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
  borderRadius: '50%',
  width: 48,
  height: 48,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0.95,
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{ ...arrowStyle, left: -24 }}
      aria-label="Previous"
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{ ...arrowStyle, right: -24 }}
      aria-label="Next"
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};

const PrizesCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 30000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box className="w-full relative" sx={{ px: { xs: 2, sm: 6, md: 10, lg: 12 }, pb: 8 }}>
      <Slider {...settings} className="pb-20 sm:pb-12 lg:pb-6">
        {prizes.map((prize) => (
          <div key={prize.county} className="px-2">
            <ProductSummary
              image={`/src/assets/product_images/${prize.county}.png`}
              name={prize.name}
              county={prize.county}
              spiritType={prize.spiritType}
              description={prize.description}
            />
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default PrizesCarousel; 