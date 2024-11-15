import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.scss'],
})
export class BottomComponent  implements OnInit {

  constructor(private router:Router) { }

  navegarA(ruta:string) {
    this.router.navigate([ruta]);
  };

  ngOnInit() {}

}
