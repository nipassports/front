import { Component, OnInit } from '@angular/core';
import{NgbCarouselConfig}from'@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  providers:[NgbCarouselConfig]
})
export class AccueilComponent implements OnInit {

  constructor(config:NgbCarouselConfig){
    config.interval=8000;
    config.wrap=true;
    config.keyboard=false;
    config.pauseOnHover=false;
  }

  ngOnInit() {
  }

}
