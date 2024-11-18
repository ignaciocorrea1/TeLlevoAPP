import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { NativeSettings, AndroidSettings, IOSSettings } from 'capacitor-native-settings';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  // Obtener posicion actual del usuario
  async getCurrentLocation() {
    try {
       const permissionStatus = await Geolocation.checkPermissions();
       console.log("Permissions status: ", permissionStatus.location);

      // Si el permiso para la ubicacion no está otorgado
       if (permissionStatus?.location != 'granted') {
          const requestStatus = await Geolocation.requestPermissions();
          
          if (requestStatus?.location != 'granted') {
            await this.openSettings(true);
            return null;
          }
       }      

       const options: PositionOptions = {
        maximumAge: 3000,
        timeout: 10000,
        enableHighAccuracy: true
       }
       const position = await Geolocation.getCurrentPosition(options);
       console.log("Posicion del usuario: ", position);

       return {latitude: position.coords.latitude, longitude: position.coords.longitude};
    } catch(e: any) {
      if (e?.message == 'Location services are not enabled') {
        await this.openSettings();
      }
      return null;
    }
  }

  // Abrir la configuracion en el dispositivo
  openSettings(app = false) {
    return NativeSettings.open({
      optionAndroid: app ? AndroidSettings.ApplicationDetails : AndroidSettings.Location, 
      optionIOS: app ? IOSSettings.App : IOSSettings.LocationServices
    });
  }

  // Chequear los permisos de localizacion
  async checkPermissions() {
    const permissions = await Geolocation.checkPermissions();

    return {location: permissions.location, coarseLocation: permissions.coarseLocation};
  }

}
