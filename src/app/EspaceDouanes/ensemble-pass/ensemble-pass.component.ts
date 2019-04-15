import { Component, OnInit } from '@angular/core';

import { Pass_json } from '../../pass_json';
import { PassService } from '../../Service/pass.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-ensemble-pass',
  templateUrl: './ensemble-pass.component.html',
  styleUrls: ['./ensemble-pass.component.css']
})
export class EnsemblePassComponent implements OnInit {

  Allpass:Pass_json[];
  constructor(private pS : PassService, private router: Router) { }
  fakeArray = new Array(16);
  ngOnInit() {
    this.getAllPass();
  }

  getAllPass(): void {
    this.pS.getAllPass()
    .subscribe( 
      (Allpass) => {
         this.Allpass = Allpass
      },
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
    console.log(this.Allpass);
  }

}
