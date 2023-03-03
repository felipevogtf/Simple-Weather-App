<h1 align="center">
  Simple Weather App
</h1>

<div align="center">
Una aplicación sencilla realizada en Ionic6, para visualizar el clima en tu ubicación actual mediante la tecnología de geolocalización y un pronóstico de los próximos 3 días (limitaciones del api), todo ello gracias a la API de Weatherapi.

</br>
</div>

</br>
 
<div align="center">
<a href="https://felipevogtf.github.io/Simple-Weather-App/">
<img alt="Logo" src="https://raw.githubusercontent.com/felipevogtf/Simple-Weather-App/main/resources/demo-light.png" width="700" />
</a>
</div>

<div align="center">
También cuenta con modo nocturno y se activa dependiendo de si en tu ubicación es de día o de noche.
<a href="https://felipevogtf.github.io/Simple-Weather-App/">
<img alt="Logo" src="https://raw.githubusercontent.com/felipevogtf/Simple-Weather-App/main/resources/demo-dark.png" width="700" />
</a>
</div>

## Consideraciones

Agregar la api key de Weatherapi en los archivos `enviroment.ts` y `enviroment.prod.ts`

```
// src\environments\environment.ts

export const environment = {
  production: false,
  apiKey: 'API_KEY_HERE',
};
```

## Instalación

Instalar dependencias

```
npm install
```

web deploy

```
ionic serve
```

android deploy

```
ionic capacitor run android
```

## Build

Se necesita [Android SDK](https://developer.android.com/studio/).

Construir una apk debug para android

```
ionic capacitor build android
```
