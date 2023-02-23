export interface WeatherConditions {
  [code: string]: Condition;
}

export interface Condition {
  code: number;
  day: string;
  night: string;
  icon: number;
}
