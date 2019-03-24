import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { GlobalToolbarInfo } from '../../globalToolbarInfo';

@Component({
  selector: 'app-toolbar-citoyen',
  templateUrl: './toolbar-citoyen.component.html',
  styleUrls: ['./toolbar-citoyen.component.css']
})
export class ToolbarCitoyenComponent implements OnInit {

  constructor(private global: GlobalToolbarInfo,private router: Router) { }
  selectedvue:string;
  ongletNav =[
    'Accueil',
    'Mon Passeport',
    'Se déconnecter',
  ];
  ngOnInit() {
    this.selectedvue='Mon Passeport';
  }
  onClick(vue: string): void{
    this.selectedvue = vue;
    if(this.selectedvue == 'Se déconnecter'){
      this.global.tbInfo = 'all';
      this.router.navigate(['/Accueil']);
    }
    console.log("selectedVue:" + this.selectedvue + ", vue:" + vue );
  }
}
