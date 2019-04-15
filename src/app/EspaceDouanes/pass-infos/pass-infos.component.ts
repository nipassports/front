import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Pass } from '../../pass';
import { AuthentificationService } from '../../Service/authentification.service';
import { PassService } from '../../Service/pass.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-pass-infos',
  templateUrl: './pass-infos.component.html',
  styleUrls: ['./pass-infos.component.css']
})
export class PassInfosComponent implements OnInit {

  pass: Pass;
  id: string;
  private passNb: string;
  frInfo = {
      type: 'Type',
      countryCode: 'Code du pays',
      passNb: 'Passeport n°', 
      name: 'Prénom',
      surname: 'Nom',     
      dateOfBirth: 'Date de naissance',
      nationality: 'Nationalité',
      sex: 'Sex',
      placeOfBirth: 'Lieu de naissance',
      height: 'Taille',
      autority: 'Autorité',
      residence: 'Domicile',
      eyesColor: 'Couleur des yeux',
      dateOfExpiry: "Date d'expiration",
      dateOfIssue: 'Date de délivrance',
      passOrigin:"Origine du passeport",
      id: "ID",
      signature: "Signature du titulaire"
  };

  enInfo = {
    type: 'Type',
    countryCode: 'Country code',
    passNb: 'Passeport no', 
    name: 'Given name',
    surname: 'Surname',     
    dateOfBirth: 'Date of birth',
    nationality: 'Nationality',
    sex: 'Sex',
    placeOfBirth: 'Place of birth',
    height: 'Height',
    autority: 'Autority',
    residence: 'Residence',
    consoler: 'Color of eyes',
    dateOfExpiry: "Date of expiry",
    dateOfIssue: 'Date of issue',
    passOrigin:"Passeport origine",
    id: "ID",
    signature: "Holder's signature"
  };

  constructor( private pS : PassService,private auth: AuthentificationService, private route:ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    
    this.passNb = this.pS.getPassNumb();
    console.log("passNb: "+this.passNb);
    this.getPass(this.passNb);
  }

  getPass(passNb: string ): void {

    console.log("LE NUM DE PASSPORT RECUPERE est :"+passNb)
    this.pS.getPassInfoDouanes(passNb)
    .subscribe( 
      pass => {this.pass = pass.infos; this.id = pass.id},

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
    console.log("pass-detail:"+ this.pass.autority);

  }

}
