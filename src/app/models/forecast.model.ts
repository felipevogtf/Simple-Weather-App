export interface Forecast {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    humidity: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    totalsnow_cm: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
  };
}

export function emptyForecast(): Forecast {
  return {
    location: {
      name: '',
      region: '',
      country: '',
      lat: 0,
      lon: 0,
      tz_id: '',
      localtime_epoch: 0,
      localtime: '',
    },
    current: {
      temp_c: 0,
      is_day: 0,
      condition: {
        text: '',
        icon: '',
        code: 0,
      },
      wind_mph: 0,
      wind_kph: 0,
      humidity: 0,
    },
    forecast: {
      forecastday: [],
    },
  };
}
