import { Component, OnInit } from '@angular/core';
import { Pass } from '../../pass';
import { PassService } from '../../Service/pass.service';
import { AuthentificationService } from '../../Service/authentification.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


import Swal from 'sweetalert2'; 
import { Password } from "../../password";

@Component({
  selector: 'app-pass-details',
  templateUrl: './pass-details.component.html',
  styleUrls: ['./pass-details.component.css']
})
export class PassDetailsComponent implements OnInit {

  pass: Pass;
  id: string;
  private passNb: string;
  private content : Password; 


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

    this.pS.getPassInfoGouv(passNb)
    .subscribe( 
      pass => {this.pass = pass.infos; this.id = pass.id});

    console.log("pass-detail:"+ this.pass.autority);

  }

  SwapValidity():void{
    Swal.fire({
      html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
      showConfirmButton: false,
    })  
    this.pS.SwapValidityGouv(this.passNb)
    .subscribe(
      message => {Swal.fire({
        text:'Vous venez de changer la validité du passeport',
        title: 'Etat du passeport',
        type:'info',
        confirmButtonText:'Fermer',
        confirmButtonColor:'#2F404D'
      })
      if (message){
        if (this.pass.validity==='Valide'){
          this.pass.validity='Invalide';
        }
        else{
          this.pass.validity='Valide';
        }
      }

    }
    )
  }


  changePassword():void{
    Swal.fire({
      html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
      showConfirmButton: false,
    })  
    this.pS.getNewPassword(this.passNb)
    .subscribe(
      (content) => {
        this.content = content; 
        if (this.content.message === "Password changed") {
          Swal.fire({
            text: this.content.password,
            title: 'Nouveau mot de passe',
            type:'info',
            confirmButtonText:'Fermer',
            confirmButtonColor:'#2F404D'
          })
        }
    },
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

    }
    )
  }


}
