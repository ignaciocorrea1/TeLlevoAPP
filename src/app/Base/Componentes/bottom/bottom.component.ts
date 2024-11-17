import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from 'src/app/Servicios/geolocation.service';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.scss'],
})
export class BottomComponent  implements OnInit {

  constructor(private router:Router, private geo:GeolocationService) { }

  // navegarA(ruta:string) {
  //   this.router.navigate([ruta]);
  // };

  ubicacion() {
    this.geo.getCurrentLocation();
  }
  
  ngOnInit() {}

}
