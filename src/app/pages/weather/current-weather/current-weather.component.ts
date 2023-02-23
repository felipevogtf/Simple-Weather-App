import { Component, OnInit } from '@angular/core';
import { CurrentWeather } from 'src/app/models/current-weather.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  currentWeather: CurrentWeather | undefined;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getWeather().subscribe((data) => {
      this.currentWeather = data;
    });
  }
}
