import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Beneficiaries: React.FC = () => {
  return (
    <Container 
      maxWidth="lg"
      className="py-8"
      id="beneficiaries"
    >
      <Typography variant="h2" component="h2" gutterBottom align="center">
        Beneficiaries
      </Typography>
      <Typography variant="body1" align="center">
        This is the Beneficiaries section. Content will be added here later.
      </Typography>
    </Container>
  );
};

export default Beneficiaries; 