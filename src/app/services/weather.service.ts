import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentWeather } from '../models/current-weather.model';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Forecast } from '../models/forecast.model';
import { Position } from '@capacitor/geolocation';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  key: string = environment.apiKey;
  maxDays: number = 3;
  coords: string = '';

  constructor(private errorService: ErrorService, private http: HttpClient) {}

  getWeather(): Observable<CurrentWeather> {
    return this.http
      .get<CurrentWeather>(
        `https://api.weatherapi.com/v1/current.json?key=${this.key}&q=${this.coords}&aqi=no`
      )
      .pipe(retry(3), catchError(this.errorService.handleError));
  }

  getForecast(): Observable<Forecast> {
    return this.http
      .get<Forecast>(
        `https://api.weatherapi.com/v1/forecast.json?key=${this.key}&q=${this.coords}&days=${this.maxDays}&aqi=no&alerts=no`
      )
      .pipe(retry(3), catchError(this.errorService.handleError));
  }

  setCoords(coords: Position) {
    this.coords = `${coords.coords.latitude},${coords.coords.longitude}`;
  }
}
