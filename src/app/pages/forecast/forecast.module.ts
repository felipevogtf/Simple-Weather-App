import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ForecastComponent } from './forecast.component';

const routes: Routes = [
  {
    path: '',
    component: ForecastComponent,
  },
];

@NgModule({
  declarations: [ForecastComponent],
  imports: [IonicModule, RouterModule.forChild(routes), CommonModule],
})
export class ForecastModule {}
