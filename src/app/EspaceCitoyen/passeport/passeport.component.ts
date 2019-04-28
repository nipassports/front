import { Component, OnInit } from '@angular/core';

import { Pass } from '../../pass';
import { PassService } from '../../Service/pass.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';



import Swal from "sweetalert2"; 


@Component({
  selector: 'app-passeport',
  templateUrl: './passeport.component.html',
  styleUrls: ['./passeport.component.css']
})
export class PasseportComponent implements OnInit {

  private pass: Pass;
  private difference; 

  selectedVue: string;

  passBar = [ 
    {title:'Mon Passeport',link:'Mon_Passeport'},
    {title:'Visa',link:'Visa'},
    {title:'Mes problèmes',link:'Autre'},
    {title:'Signaler un problème', link:'Signaler_Probleme'}
  ];

  constructor( private pS : PassService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }




ngOnInit() {
    this.selectedVue = 'Mon_Passeport';
  }



  onClick(vue: string): void{
    this.selectedVue = vue;
    console.log("selectedVue:" + this.selectedVue + ", vue:" + vue );

  }
}
