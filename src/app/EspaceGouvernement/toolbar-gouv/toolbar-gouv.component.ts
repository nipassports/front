import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { GlobalToolbarInfo } from '../../globalToolbarInfo';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {View} from '../../view';
import {ViewService} from '../../Service/view.service';
@Component({
  selector: 'app-toolbar-gouv',
  templateUrl: './toolbar-gouv.component.html',
  styleUrls: ['./toolbar-gouv.component.css']
})
export class ToolbarGouvComponent implements OnInit {


  ongletNav =[
    {title:'Espace Gouvernement',link:'/Espace_Gouvernement',autority:1},
    {title:'Ajout Passeport',link:'/Espace_Gouvernement/Ajout_Passeport',autority:1},
    {title:'Modifier Passeport',link:'/Espace_Gouvernement/Modifier_Passeport',autority:0},
    {title:'Liste des Passeports',link:'/Espace_Gouvernement/Liste_des_Passeports',autority:1},
    {title:'Gestion des problèmes', link:'/Espace_Gouvernement/Gestion_des_Problèmes',autority:1},
    {title:'Ajout Visa', link:'/Espace_Gouvernement/Ajout_Visa',autority:1},
    {title:'Se déconnecter', link:'#',autority:1}
  ];

  constructor(private global: GlobalToolbarInfo,private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,private viewService: ViewService) { }

  ngOnInit() {
    if ( this.storage.get("view") !== null ){
      this.viewService.setView(this.storage.get('view'));
      }
    if ( this.storage.get("autority") !== null ){
      this.global.autority = this.storage.get("autority");
     }
     else{
      this.global.autority = 0;
     }

     this.ongletNav =[
      {title:'Espace Gouvernement',link:'/Espace_Gouvernement',autority:1},
      {title:'Ajout Passeport',link:'/Espace_Gouvernement/Ajout_Passeport',autority:1},
      {title:'Modifier Passeport',link:'/Espace_Gouvernement/Modifier_Passeport',autority:this.global.autority},
      {title:'Liste des Passeports',link:'/Espace_Gouvernement/Liste_des_Passeports',autority:1},
      {title:'Gestion des problèmes', link:'/Espace_Gouvernement/Gestion_des_Problèmes',autority:1},
      {title:'Ajout Visa', link:'/Espace_Gouvernement/Ajout_Visa',autority:1},
      {title:'Se déconnecter', link:'#',autority:1}
    ];

  }
  
  onClick(vue: any): void{
    this.viewService.setView(vue.title);
    this.storage.set("view",vue.title);
    if(this.viewService.getView() == 'Se déconnecter'){
      this.global.tbInfo = 'all';
      this.storage.remove("tbInfo");
      this.storage.remove("token");
      this.storage.set("view",'Accueil');
      this.storage.remove("autority");
      this.storage.remove("passInfo");
      this.router.navigate(['/Accueil']);
    }
    console.log("selectedVue:" + this.viewService.getView()+ ", vue:" + vue.title );
  }
}
