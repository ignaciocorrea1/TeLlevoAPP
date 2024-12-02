Leer antes de iniciar el proyecto!!!

Pasos a seguir para instalar las librerías del proyecto:

PD: Algunos pasos puede que no se tengan que realizar pero siempre es mejor verificar si estan correctos.

1. npm install
2. npm install @capacitor/geolocation
3. ionic build
4. ionic cap add android
5. Ver en el archivo variables.gradle si esta lo siguiente, en caso de no estar agregarlo al final:     playServicesLocationVersion = '21.1.0'
6. Ver si en androidManifestXml estan los permisos de geolocalizacion, (Los permisos se encuentran abajo): Permisos de geolocalizacion
7. npx cap sync
8. npm i capacitor-native-settings
9. npm install mapbox-gl --save
10. Agregar un token de mapbox válido en los environments 

Permisos de geolocalización: 
<!-- Geolocation API -->
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-feature android:name="android.hardware.location.gps" />