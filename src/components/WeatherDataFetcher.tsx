import React, { useEffect, useCallback, useMemo, useState } from 'react';
import axios from 'axios';
import citiesData from '../utils/cities.json';
import { WeatherDataFetcherProps } from '../interface/types';

const WeatherDataFetcher: React.FC<WeatherDataFetcherProps> = ({ selectedCity, onWeatherUpdate }) => {
  // const [minTemp, setMinTemp] = useState(0);
  // const[maxTemp,setMaxTem] = useState(0);


  const fetchWeatherData = useCallback(async (selectedCity: string) => {
    const cityData = citiesData.find(c => c.city === selectedCity);
    if (!cityData) return;

    const { lat, lng } = cityData;

    try {
      const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`);
      const data = response.data;

      if (data?.daily?.temperature_2m_max?.length > 0 && data?.daily?.temperature_2m_min?.length > 0) {
        const max = data.daily.temperature_2m_max[0];
        const min = data.daily.temperature_2m_min[0];
        const avg= (min+max)/2;

        // i am tyring to useMemo here .but unable to use  here beacause it show error that 
        // i can't useMemo inside the useCallback;
         
        // setMaxTem(max);
        // setMinTemp(min);
        
        //onWeatherUpdate(max,min,avg);
      } else {
        console.error('Invalid weather data format:', data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }, [onWeatherUpdate]);
      // i am trying to use useMemo here but unable to use it ;
    // useMemo 
    // const avg = useMemo(()=>{
    //      return (minTemp+maxTemp)/2;
    //     },[minTemp,maxTemp]);

    //   console.log(minTemp,maxTemp);
    //  onWeatherUpdate(minTemp,maxTemp,avg);

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData(selectedCity);
    }
  }, [selectedCity, fetchWeatherData]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (selectedCity) {
        fetchWeatherData(selectedCity);
      }
    }, 600000); // 10 minutes
    return () => clearInterval(intervalId);
  }, [selectedCity, fetchWeatherData]);

  return null; 
};

export default WeatherDataFetcher;
