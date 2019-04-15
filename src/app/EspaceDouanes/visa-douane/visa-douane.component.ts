import { Component, OnInit } from '@angular/core';
import {Visa} from '../../visa'
import{Visa_json} from '../../visa_json'
import { PassService } from '../../Service/pass.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-visa-douane',
  templateUrl: './visa-douane.component.html',
  styleUrls: ['./visa-douane.component.css']
})
export class VisaDouaneComponent implements OnInit {

  visa_json:Visa_json[];
  
  constructor(private pS : PassService, private router: Router) { }
  private passNb: string;

  ngOnInit() {
    this.passNb = this.pS.getPassNumb();
    this.getVisa(this.passNb);
  }

  getVisa(passNb:string): void {
    this.pS.getVisaDouane(passNb)
    .subscribe(
      visa_json => this.visa_json = visa_json,
      error => {
        console.log('ERROR: ' + JSON.stringify(error));
        Swal.fire({
          text: "Votre session a expirée !",
          type: 'warning',
          confirmButtonText: 'Fermer',
          confirmButtonColor: '#2F404D',
          timer: 6000
        })
        this.pS.clean();
        this.router.navigate(['/Se connecter']);
      });
    console.log(this.visa_json);
  }

}
