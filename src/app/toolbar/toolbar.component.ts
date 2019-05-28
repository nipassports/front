import { Component, OnInit } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject} from '@angular/core';
import {View} from '../view';
import {ViewService} from '../Service/view.service'
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService,private viewService: ViewService) { }
  ongletNav =[
    {title:'Accueil',link:'Accueil'},
    // {title:'FAQ',link:'FAQ'},
    {title:'Se connecter', link:'Se_connecter'}
  ];

  ngOnInit() {
    if ( this.storage.get("view") !== null ){
    this.viewService.setView(this.storage.get('view'));
    }
  }
  onClick(vue: any): void{
    console.log("la vue est :"+vue);
    this.viewService.setView(vue.title);
    this.storage.set("view",vue);
    console.log("selectedVue:" + this.viewService.getView() + ", vue:" + vue );
  }

}