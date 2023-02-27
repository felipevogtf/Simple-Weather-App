import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CurrentWeather,
  emptyCurrentWeather,
} from 'src/app/models/current-weather.model';
import { Condition } from 'src/app/models/weather-conditions.model';
import { WeatherConditionService } from 'src/app/services/weather-conditions.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Geolocation } from '@capacitor/geolocation';
import { Platform, ToastController } from '@ionic/angular';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  currentWeather: CurrentWeather = emptyCurrentWeather();
  isLoad: boolean = false;
  granted: boolean = false;
  interval: any;

  constructor(
    private weatherService: WeatherService,
    public weatherConditionService: WeatherConditionService,
    private router: Router,
    private toastController: ToastController,
    private platform: Platform,
    private openNativeSettings: OpenNativeSettings
  ) {}

  ngOnInit() {
    this.getWeather();
    this.interval = setInterval(() => {
      this.getWeather();
    }, 300000);
  }

  ionViewDidLeave() {
    clearInterval(this.interval);
  }

  async getWeather(): Promise<void> {
    this.isLoad = false;
    // Verificar permisos
    try {
      const permissions = await Geolocation.checkPermissions();
      console.log('checkPermissions()', permissions.location == 'granted');
      this.granted = permissions.location == 'granted';
    } catch (error) {
      console.log(error);
    }

    // Solicitar permisos
    if (this.platform.is('capacitor') && !this.granted) {
      try {
        const permissions = await Geolocation.requestPermissions();
        console.log('requestPermissions()', permissions.location == 'granted');
        this.granted = permissions.location == 'granted';
      } catch (error) {
        console.log(error);
      }
    }

    if (this.granted) {
      let coordinates: any;

      try {
        coordinates = await Geolocation.getCurrentPosition();
      } catch (error) {
        this.presentToast();
      }

      this.weatherService.setCoords(coordinates);
      this.weatherService.getWeather().subscribe((data) => {
        this.currentWeather = data;
        this.isLoad = true;

        let day: string = this.currentWeather.current.is_day ? '' : 'dark';
        document.body.setAttribute('color-theme', day);
      });
    } else {
      this.presentToast();
      this.isLoad = true;
    }
  }

  getIcon(code: number): string {
    let icon: string = '';

    if (this.isLoad) {
      let day: string = this.currentWeather.current.is_day ? 'day' : 'night';
      icon = `./assets/${day}/${
        this.weatherConditionService.getCondition(code).icon
      }.png`;
    }

    return icon;
  }

  getDefaultIcon(): string {
    const icon: string = `./assets/day/113.png`;

    return icon;
  }

  getCondition(code: number): string {
    let conditionText: string = '';

    if (this.isLoad) {
      const condition: Condition =
        this.weatherConditionService.getCondition(code);

      conditionText = this.currentWeather.current.is_day
        ? condition.day
        : condition.night;
    }

    return conditionText;
  }

  navigate() {
    this.router.navigate(['/forecast']);
  }

  async presentToast() {
    let buttons: any = [];
    if (this.platform.is('capacitor')) {
      buttons = [
        {
          text: 'Activar',
          role: 'info',
          handler: () => {
            this.openNativeSettings
              .open('application_details')
              .then((data) => console.log(data));
          },
        },
      ];
    }

    const toast = await this.toastController.create({
      message: 'Se necesitan permisos',
      duration: 1500,
      position: 'bottom',
      buttons: buttons,
    });

    await toast.present();
  }
}
