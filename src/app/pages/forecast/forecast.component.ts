import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { emptyForecast, Forecast } from 'src/app/models/forecast.model';
import { WeatherConditionService } from 'src/app/services/weather-conditions.service';
import { WeatherService } from 'src/app/services/weather.service';
import { Geolocation } from '@capacitor/geolocation';
import { Platform, ToastController } from '@ionic/angular';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  forecast: Forecast = emptyForecast();
  isLoad: boolean = false;

  constructor(
    private weatherService: WeatherService,
    public weatherConditionService: WeatherConditionService,
    private router: Router,
    private toastController: ToastController,
    private platform: Platform,
    private openNativeSettings: OpenNativeSettings
  ) {}

  ngOnInit() {
    this.getForecast();
  }

  async getForecast(): Promise<void> {
    let granted: boolean = false;

    // Verificar permisos
    try {
      const permissions = await Geolocation.checkPermissions();
      console.log('checkPermissions()', permissions.location == 'granted');
      granted = permissions.location == 'granted';
    } catch (error) {
      console.log(error);
    }

    // Solicitar permisos
    if (this.platform.is('capacitor') && !granted) {
      try {
        const permissions = await Geolocation.requestPermissions();
        console.log('requestPermissions()', permissions.location == 'granted');
        granted = permissions.location == 'granted';
      } catch (error) {
        console.log(error);
      }
    }

    if (granted) {
      let coordinates: any;

      try {
        coordinates = await Geolocation.getCurrentPosition();
      } catch (error) {
        this.presentToast();
      }

      this.weatherService.getForecast().subscribe((data) => {
        this.forecast = data;
        this.isLoad = true;

        let day: string = this.forecast.current.is_day ? '' : 'dark';
        document.body.setAttribute('color-theme', day);
      });
    } else {
      this.presentToast();
    }

    const coordinates = await Geolocation.getCurrentPosition();
    this.weatherService.setCoords(coordinates);

    if (this.weatherService.coords) {
    }
  }

  getIcon(code: number): string {
    let icon: string = '';

    if (this.isLoad) {
      icon = `./assets/day/${
        this.weatherConditionService.getCondition(code).icon
      }.png`;
    }

    return icon;
  }

  navigate() {
    this.router.navigate(['/']);
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
