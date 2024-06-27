import React, { useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import CitySelect from './CitySelect';
import WeatherDisplay from './WeatherDisplay';
import WeatherDataFetcher from './WeatherDataFetcher';
import { FormData } from '../interface/types';

const WeatherWidget: React.FC = () => {
  const { handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      city: localStorage.getItem('selectedCity') || '',
    },
  });

  const [weather, setWeather] = useState<{ max: number; min: number; avg: number } | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(localStorage.getItem('selectedCity') || null);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setSelectedCity(data.city);
    localStorage.setItem('selectedCity', data.city);
  };

  const handleWeatherUpdate = (max: number, min: number, avg: number) => {
    setWeather({ max, min, avg });
  };

  return (
    <Box sx={{ maxWidth: 300, mx: 'auto', mt: 5 }}>
      <Typography variant='h4' sx={{ textAlign: 'center', mb: 3 }}>Weather App</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CitySelect control={control} />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mb: 2 }}>
          Submit
        </Button>
      </form>
      <WeatherDataFetcher selectedCity={selectedCity} onWeatherUpdate={handleWeatherUpdate} />
      {weather && (
        <WeatherDisplay
          city={localStorage.getItem('selectedCity')}
          max={weather.max}
          min={weather.min}
          avg={weather.avg}
        />
      )}
    </Box>
  );
};

export default WeatherWidget;
