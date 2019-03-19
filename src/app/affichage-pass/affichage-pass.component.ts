import { Component, OnInit } from '@angular/core';
import { PassService } from '../pass.service';
import { Pass } from '../pass';
import { Pass_json } from '../pass_json';
import { Routes, RouterModule,ActivatedRoute } from '@angular/router';
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
    'Mon Passeport',
    'Visa',
    'Autre'

  ];

  constructor( private pS : PassService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.selectedVue = 'Mon Passeport';
    this.route.params
    .subscribe(params=>this.pS.setPassNumb(params.passNb));

  }

  onClick(vue: string): void{
    this.selectedVue = vue;
    console.log("selectedVue:" + this.selectedVue + ", vue:" + vue );
  }

}

