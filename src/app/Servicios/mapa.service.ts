import { Injectable } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment.prod';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  public map: mapboxgl.Map | null = null;
  public style = 'mapbox://styles/mapbox/streets-v11';

  constructor(private http:HttpClient) { 
    (mapboxgl as any).accessToken = environment.mapbox_key;
  }

  // Generar mapa
  buildMap(cont:string, lng:number, lat:number) {
    this.map = new mapboxgl.Map({
      container: cont,
      style: this.style,
      zoom: 16,
      center: [lng, lat]
    });

    // Una vez se inicializa el mapa se reajusta el tamaño
    this.map.resize();
  }

  // Dibujar ruta del viaje
  drawRoute(start: [number, number], end: [number, number]) {
    // Validar que el mapa este inicializado
    if (!this.map) {
      console.error('El mapa no está inicializado.');
      return;
    }
  
    // Url para la api de mapbox
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.join(',')};${end.join(',')}?geometries=geojson&access_token=${environment.mapbox_key}`;
  
    // Solicitud 
    this.http.get(url).subscribe(
      (data: any) => {
        // Valida que el array de rutas no este vacio
        if (data.routes && data.routes.length > 0) {
          // Se obtiene la primera ruta disponible
          const route = data.routes[0].geometry.coordinates;
  
          // Verificar si la capa ya existe antes de agregarla
          if (this.map!.getLayer('route')) {
            this.map!.removeLayer('route');
            this.map!.removeSource('route');
          }
  
          // Dibuja una capa para la ruta
          this.map!.addLayer({
            // Configuraciones basicas para la capa
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: route
                }
              }
            },
            // Estilo para la linea
            layout: { 
              'line-join': 'round',
              'line-cap': 'round'
            },
            // Estilo para la linea
            paint: {
              'line-color': '#aa59ff',
              'line-width': 5
            }
          });
        } else {
          console.error('No se encontró una ruta válida.');
        }
      },
      (error) => {
        console.error('Error al obtener la ruta:', error);
      }
    );
  }

  // Marcador de ubicacion
  addMarker(lng:number, lat:number) {
    // Valida inicializacion del mapa
    if (!this.map) {
      return;
    } else {
      // Si esta inicializado se agrega el marcador
      new mapboxgl.Marker({color: '#AA59FF'})
      .setLngLat([lng, lat])
      .addTo(this.map)
    }
  }

  // Boton para volver sobre la ubicacion del usuario
  geolocateControl() {
    // Si el mapa esta inicializado se agrega el control
    if (this.map) {
      this.map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        })
      )
    }
  }
}
