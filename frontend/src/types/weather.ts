export interface WeatherData {
  main: WeatherMain;
  weather: Weather[];
  wind: Wind;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  humidity: number;
}

export interface Weather {
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
}

export interface WeatherState {
  weather: WeatherData[];
  loading: boolean;
  error: string | null;
}