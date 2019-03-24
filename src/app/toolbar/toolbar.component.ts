import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }
  selectedvue:string;
  ongletNav =[
    'Accueil',
    //'Mon Passeport',
    'Se connecter',
    //'Ajout Passeport',
    //'Liste des Passeports'
  ];
  ngOnInit() {
    this.selectedvue='Accueil';
  }
  onClick(vue: string): void{
    this.selectedvue = vue;
    console.log("selectedVue:" + this.selectedvue + ", vue:" + vue );
  }

}