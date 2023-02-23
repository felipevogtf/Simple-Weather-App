import { Component, OnInit } from '@angular/core';
import { CurrentWeather } from 'src/app/models/current-weather.model';
import { WeatherConditionService } from 'src/app/services/weather-conditions.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  currentWeather: CurrentWeather | undefined;

  constructor(
    private weatherService: WeatherService,
    public weatherConditionService: WeatherConditionService
  ) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather(): void {
    this.weatherService.getWeather().subscribe((data) => {
      this.currentWeather = data;
      let day: string = this.currentWeather.current.is_day ? 'day' : 'dark';
      document.body.setAttribute('color-theme', day);
    });
  }

  getIcon(code: number): string {
    let icon: string = '';

    if (this.currentWeather) {
      let day: string = this.currentWeather.current.is_day ? 'day' : 'night';
      icon = `./assets/${day}/${
        this.weatherConditionService.getCondition(code).icon
      }.png`;
    }

    return icon;
  }

  getCondition(code: number): string {
    let condition: string = '';

    if (this.currentWeather) {
      condition = this.weatherConditionService.getCondition(code).day;
    }

    return condition;
  }
}
