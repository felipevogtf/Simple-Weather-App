export interface CurrentWeather {
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
    wind_kph: number;
    humidity: number;
  };
}

export function emptyCurrentWeather(): CurrentWeather {
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
      wind_kph: 0,
      humidity: 0,
    },
  };
}
