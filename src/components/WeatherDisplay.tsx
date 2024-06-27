
import React from 'react';
import { Typography, Box } from '@mui/material';
import { WeatherDisplayProps } from '../interface/types';



const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ city, max, min, avg }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6">{city}</Typography>
      <Typography>Max Temperature: {max}°C</Typography>
      <Typography>Min Temperature: {min}°C</Typography>
      <Typography>Average Temperature: {avg.toFixed(2)}°C</Typography>
    </Box>
  );
};

export default WeatherDisplay;
