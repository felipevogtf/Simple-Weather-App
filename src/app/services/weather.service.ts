import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentWeather } from '../models/current-weather.model';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private errorService: ErrorService, private http: HttpClient) {}

  getWeather(): Observable<CurrentWeather> {
    return this.http
      .get<CurrentWeather>(
        `https://api.weatherapi.com/v1/current.json?key=f0f687d1c768481ba33155523232202&q=Temuco&aqi=no`
      )
      .pipe(retry(3), catchError(this.errorService.handleError));
  }
}
