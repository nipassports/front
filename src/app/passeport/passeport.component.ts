import { Component, OnInit } from '@angular/core';
import { PassService } from '../pass.service';
import { Pass } from '../pass';

@Component({
  selector: 'app-passeport',
  templateUrl: './passeport.component.html',
  styleUrls: ['./passeport.component.css']
})
export class PasseportComponent implements OnInit {

  pass: Pass;

  selectedVue: string;

  passBar = [ 
    'Mon Passeport',
    'Visa',
    'Autre'

  ];

  constructor( private pS : PassService) { }

  ngOnInit() {
    this.getPass(1);
    this.selectedVue = 'Mon Passeport';
  }

  getPass(id: number ): void {
    this.pS.getPassInfo(id)
    .subscribe( pass => this.pass = pass);
    console.log(this.pass);
  }

  onClick(vue: string): void{
    this.selectedVue = vue;
  }
}
