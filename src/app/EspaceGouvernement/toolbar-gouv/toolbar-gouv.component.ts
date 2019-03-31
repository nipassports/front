import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { GlobalToolbarInfo } from '../../globalToolbarInfo';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-toolbar-gouv',
  templateUrl: './toolbar-gouv.component.html',
  styleUrls: ['./toolbar-gouv.component.css']
})
export class ToolbarGouvComponent implements OnInit {

  constructor(private global: GlobalToolbarInfo,private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  selectedvue:string;
  ongletNav =[
    {title:'Espace Gouvernement',link:'/Espace Gouvernement'},
    {title:'Ajout Passeport',link:'/Espace Gouvernement/Ajout Passeport'},
    {title:'Modifier Passeport',link:'/Espace Gouvernement/Modifier Passeport'},
    {title:'Liste des Passeports',link:'/Espace Gouvernement/Liste des Passeports'},
    {title:'Gestion des problèmes', link:'/Espace Gouvernement/Gestion des Problèmes'},
    {title:'Se déconnecter', link:'#'}
  ];


  ngOnInit() {
    this.selectedvue='Espace Gouvernement';
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
