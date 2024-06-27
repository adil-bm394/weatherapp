



import { Control } from "react-hook-form";

export interface WeatherDisplayProps {
  city: string | null;
  max: number;
  min: number;
  avg: number;
}

export interface CitySelectProps {
  control: Control<{ city: string }>; 
}

export interface WeatherDataFetcherProps {
  selectedCity: string | null;
  onWeatherUpdate: (max: number, min: number, avg: number) => void;
}

export interface FormData {
  city: string;
}
