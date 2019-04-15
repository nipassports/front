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

        async (error) => {
          console.log(" modify pass info: ERROR: " + error.error.message);

          if(error.error.message === "Auth failed"){
            await Swal.fire({
              type: 'warning',
              title: "Votre session vient d'expirer !",
              confirmButtonColor: '#2F404D',
            })

            this.pS.clean();
            this.router.navigate(['/Se connecter']);
          }
          else{
            Swal.fire({
              type: 'warning',
              title: "Une erreur est survenu ! Veuillez ré-essayer ultérieurement.",
              confirmButtonColor: '#2F404D',
            })
          }

        });
        
    console.log(JSON.stringify(this.Allpass));

  }


}
