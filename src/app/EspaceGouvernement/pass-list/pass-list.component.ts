import { Component, OnInit, Inject } from '@angular/core';
import { Pass_json } from '../../pass_json';
import { PassService } from '../../Service/pass.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-pass-list',
  templateUrl: './pass-list.component.html',
  styleUrls: ['./pass-list.component.css']
})

export class PassListComponent implements OnInit {

  Allpass: Pass_json[];
  fakeArray = new Array(16);

  constructor(private pS: PassService, private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }


  ngOnInit() {
    this.getAllPassGouv();
  }

  getAllPassGouv(): void {
    this.pS.getAllPassGouv()
      .subscribe(
        (Allpass) => {
           this.Allpass = Allpass;
        },

        error => {
          console.log('ERROR: ' + JSON.stringify(error));
          Swal.fire({
            text: "Une erreur est survenu !",
            type: 'warning',
            confirmButtonText: 'Fermer',
            confirmButtonColor: '#2F404D',
            timer: 6000
          })

        });
    console.log(JSON.stringify(this.Allpass));

  }


}
