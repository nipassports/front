import { Component, OnInit } from '@angular/core';

import { Pass } from '../../pass';
import { ActivatedRoute } from '@angular/router';
import { PassService } from '../../Service/pass.service';

@Component({
  selector: 'app-affichage-pass',
  templateUrl: './affichage-pass.component.html',
  styleUrls: ['./affichage-pass.component.css']
})
export class AffichagePassComponent implements OnInit {


  private pass: Pass;
  private passNb;
  selectedVue: string;

  passBar = [ 
    'Passeport',
    'Visa',
    'Autre'

  ];

  constructor( private pS : PassService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.selectedVue = 'Passeport';
    this.route.params
    .subscribe(params=>this.pS.setPassNumb(params.passNb));

  }

  onClick(vue: string): void{
    this.selectedVue = vue;
    console.log("selectedVue:" + this.selectedVue + ", vue:" + vue );
  }

}

