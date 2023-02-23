import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: CurrentWeatherComponent,
  },
];

@NgModule({
  declarations: [CurrentWeatherComponent],
  imports: [IonicModule, RouterModule.forChild(routes), CommonModule],
})
export class WeatherModule {}
