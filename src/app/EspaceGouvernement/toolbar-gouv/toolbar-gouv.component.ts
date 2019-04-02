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

  selectedvue:string;
  ongletNav =[
    {title:'Espace Gouvernement',link:'/Espace Gouvernement',autority:1},
    {title:'Ajout Passeport',link:'/Espace Gouvernement/Ajout Passeport',autority:1},
    {title:'Modifier Passeport',link:'/Espace Gouvernement/Modifier Passeport',autority:0},
    {title:'Liste des Passeports',link:'/Espace Gouvernement/Liste des Passeports',autority:1},
    {title:'Gestion des problèmes', link:'/Espace Gouvernement/Gestion des Problèmes',autority:1},
    {title:'Se déconnecter', link:'#',autority:1}
  ];

  constructor(private global: GlobalToolbarInfo,private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.selectedvue='Espace Gouvernement';
    if ( this.storage.get("autority") !== null ){
      this.global.autority = this.storage.get("autority");
     }
     else{
      this.global.autority = 0;
     }

     this.ongletNav =[
      {title:'Espace Gouvernement',link:'/Espace Gouvernement',autority:1},
      {title:'Ajout Passeport',link:'/Espace Gouvernement/Ajout Passeport',autority:1},
      {title:'Modifier Passeport',link:'/Espace Gouvernement/Modifier Passeport',autority:this.global.autority},
      {title:'Liste des Passeports',link:'/Espace Gouvernement/Liste des Passeports',autority:1},
      {title:'Gestion des problèmes', link:'/Espace Gouvernement/Gestion des Problèmes',autority:1},
      {title:'Se déconnecter', link:'#',autority:1}
    ];

  }
  
  onClick(vue: any): void{
    this.selectedvue = vue.title;
    if(this.selectedvue == 'Se déconnecter'){
      this.global.tbInfo = 'all';
      this.storage.remove("tbInfo");
      this.storage.remove("token");
      this.storage.remove("autority");
      this.storage.remove("passInfo");
      this.router.navigate(['/Accueil']);
    }
    console.log("selectedVue:" + this.selectedvue + ", vue:" + vue );
  }
}
