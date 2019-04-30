import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { GlobalToolbarInfo } from '../../globalToolbarInfo';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import {View} from '../../view';
import {ViewService} from '../../Service/view.service';
import { PassService } from '../../Service/pass.service';
@Component({
  selector: 'app-toolbar-douane',
  templateUrl: './toolbar-douane.component.html',
  styleUrls: ['./toolbar-douane.component.css']
})
export class ToolbarDouaneComponent implements OnInit {

  constructor(private global: GlobalToolbarInfo,private router: Router,private pS: PassService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,private viewService: ViewService) { }


  ongletNav =[
    {title:'Accueil',link:'/Accueil'},
    {title:'Liste des Passeports',link:'/Espace_Douanes/Liste_des_Passeports'},
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

      this.global.tbInfo = 'all';
      this.storage.set("view",'Accueil');
      this.pS.clean();
      this.router.navigate(['/Accueil']);
    }
    console.log("selectedVue:" + this.viewService.getView()+ ", vue:" + vue );
  }

}
