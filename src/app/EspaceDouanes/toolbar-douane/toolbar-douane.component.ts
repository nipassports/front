import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { GlobalToolbarInfo } from '../../globalToolbarInfo';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-toolbar-douane',
  templateUrl: './toolbar-douane.component.html',
  styleUrls: ['./toolbar-douane.component.css']
})
export class ToolbarDouaneComponent implements OnInit {

  constructor(private global: GlobalToolbarInfo,private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  selectedvue:string;
  ongletNav =[
    {title:'Accueil',link:'/Accueil'},
    {title:'Liste des Passeports',link:'/Espace Douanes/Liste des Passeports'},
    {title:'Se déconnecter',link:'#'},    
  ];
  ngOnInit() {
    this.selectedvue='Mon Passeport';
  }
  onClick(vue: any): void{
    this.selectedvue = vue.title;
    if(this.selectedvue == 'Se déconnecter'){
      this.global.tbInfo = 'all';
      this.storage.remove("tbInfo");
      this.storage.remove("token");

      this.router.navigate(['/Accueil']);
    }
    console.log("selectedVue:" + this.selectedvue + ", vue:" + vue );
  }

}
