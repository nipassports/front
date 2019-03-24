import { Component, OnInit } from '@angular/core';

import { Pass } from '../pass';
import { PassService } from '../Service/pass.service';

@Component({
  selector: 'app-passeport',
  templateUrl: './passeport.component.html',
  styleUrls: ['./passeport.component.css']
})
export class PasseportComponent implements OnInit {

  private pass: Pass;

  selectedVue: string;

  passBar = [ 
    'Mon Passeport',
    'Visa',
    'Autre'

  ];

  constructor( private pS : PassService) { }

  ngOnInit() {
    this.selectedVue = 'Mon Passeport';
  }

  onClick(vue: string): void{
    this.selectedVue = vue;
    console.log("selectedVue:" + this.selectedVue + ", vue:" + vue );
  }
}
