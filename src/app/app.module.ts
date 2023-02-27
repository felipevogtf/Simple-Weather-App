import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-CL';
registerLocaleData(localeEs, 'es-Cl');

import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      mode: 'ios',
    }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-Cl' },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    OpenNativeSettings,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
