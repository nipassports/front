import { Component, OnInit } from '@angular/core';

import { Pass } from '../../pass';
import { PassService } from '../../Service/pass.service';


import Swal from "sweetalert2"; 


@Component({
  selector: 'app-passeport',
  templateUrl: './passeport.component.html',
  styleUrls: ['./passeport.component.css']
})
export class PasseportComponent implements OnInit {

  private pass: Pass;
  private difference; 

  selectedVue: string;

  passBar = [ 
    {title:'Mon Passeport',link:'Mon_Passeport'},
    {title:'Visa',link:'Visa'},
    {title:'Autre',link:'Autre'},
  ];

  constructor( private pS : PassService) { }


  time() : void {
    var subdate = localStorage.dateOfExpiry.substring(1, localStorage.dateOfExpiry.length -1);  

    alert(subdate); 
    var timesplitted = subdate.toString().split('-', 3); 
    let dateOfExpiry = new Date(timesplitted[1]+'/'+timesplitted[2]+'/'+timesplitted[0]).getTime();
    let today =  new Date().getTime(); 


    // tableau des différences en jour, mois et années
    let differencetab = [ Math.ceil((dateOfExpiry - today)/ (1000 * 3600 * 24)), Math.ceil((dateOfExpiry - today)/ (1000 * 3600 * 24 * 30)), Math.ceil((dateOfExpiry - today)/ (1000 * 3600 * 24 * 30 * 12))];

    let message = "Votre passeport périme dans "
    //choix de la valeur 
    if (differencetab[0]<30) {
      message += differencetab[0] + " jour(s)"; 
    } else if (differencetab[1]<12) {
      message += differencetab[1] + " mois"; 
    } else {
      message += differencetab[2] + " an(s)"; 
    }

    Swal.fire ({
      title: 'Validité',
      text : message,
      type: 'info',
      confirmButtonText: 'Fermer', 
      confirmButtonColor: '#2F404D',
      timer : 3000
    }) 
  }


  ngOnInit() {
    this.selectedVue = 'Mon_Passeport';
    this.time(); 
  }





  onClick(vue: string): void{
    this.selectedVue = vue;
    console.log("selectedVue:" + this.selectedVue + ", vue:" + vue );

  }
}
