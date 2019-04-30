import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { Router } from '@angular/router';
import { GlobalToolbarInfo } from '../../globalToolbarInfo';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {ViewService} from '../../Service/view.service';
@Component({
  selector: 'app-toolbar-citoyen',
  templateUrl: './toolbar-citoyen.component.html',
  styleUrls: ['./toolbar-citoyen.component.css']
})
export class ToolbarCitoyenComponent implements OnInit {

  constructor(private global: GlobalToolbarInfo,private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,private viewService: ViewService) { }
  

  ongletNav =[
    {title:'Accueil',link:'/Accueil'},
    {title:'Mon Passeport',link:'/Espace_Citoyen/Mon_Passeport'},
    {title:'Se déconnecter',link:'#'},  
  ];

  ngOnInit() {
    if ( this.storage.get("view") !== null ){
      this.viewService.setView(this.storage.get('view'));
      }
  }

  onClick(vue: any): void{
    this.viewService.setView(vue.title);
    this.storage.set("view",vue.title);
    if(this.viewService.getView() == 'Se déconnecter'){

      this.storage.remove("tbInfo");
      this.storage.remove("token");
      localStorage.removeItem("dateOfExpiry"); 
      
      this.storage.remove("passNb");
      this.global.tbInfo ='all';
      this.storage.set("view",'Accueil');
      this.router.navigate(['/Accueil']);
    }
    console.log("selectedVue:" + this.viewService.getView()+ ", vue:" + vue );
  }
}
