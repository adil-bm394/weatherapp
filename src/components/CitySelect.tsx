import React from 'react';
import { MenuItem, FormControl, Select } from '@mui/material';
import citiesData from '../utils/cities.json';
import { Controller } from 'react-hook-form';
import { CitySelectProps } from '../interface/types';

const CitySelect: React.FC<CitySelectProps> = ({ control }) => {
  return (
    <FormControl fullWidth>
      <Controller
        name="city"
        control={control}
        render={({ field }) => (
          <Select {...field} displayEmpty>
            <MenuItem value="" disabled>Select a city</MenuItem>
            {citiesData.map((c) => (
              <MenuItem key={c.city} value={c.city}>{c.city}</MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default CitySelect;
