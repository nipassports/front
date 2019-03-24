import { Component, OnInit } from '@angular/core';
import { GlobalToolbarInfo } from '../../globalToolbarInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-douane',
  templateUrl: './toolbar-douane.component.html',
  styleUrls: ['./toolbar-douane.component.css']
})
export class ToolbarDouaneComponent implements OnInit {

  constructor(private global: GlobalToolbarInfo,private router: Router) { }
  selectedvue:string;
  ongletNav =[
    'Accueil',
    'Liste des Passeports',
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
