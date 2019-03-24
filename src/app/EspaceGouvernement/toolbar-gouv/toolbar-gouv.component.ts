import { Component, OnInit } from '@angular/core';
import { GlobalToolbarInfo } from '../../globalToolbarInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar-gouv',
  templateUrl: './toolbar-gouv.component.html',
  styleUrls: ['./toolbar-gouv.component.css']
})
export class ToolbarGouvComponent implements OnInit {

  constructor(private global: GlobalToolbarInfo,private router: Router) { }
  selectedvue:string;
  ongletNav =[
    'Accueil',
    'Ajout de Passeport',
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
