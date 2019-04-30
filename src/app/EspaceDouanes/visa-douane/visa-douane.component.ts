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

      async (error) => {
        console.log(" modify pass info: ERROR: " + error.error.message);

        if(error.error.message === "Auth failed"){
          await Swal.fire({
            type: 'warning',
            title: "Votre session vient d'expirer !",
            confirmButtonColor: '#2F404D'
          })

          this.pS.clean();
          this.router.navigate(['/Se_connecter']);
        }
        else{
          Swal.fire({
            type: 'warning',
            title: "Une erreur est survenu ! Veuillez ré-essayer ultérieurement.",
            confirmButtonColor: '#2F404D',
          })
        }

      });
      
    console.log(this.visa_json);
  }

}
