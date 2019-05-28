import { Component, OnInit } from '@angular/core';

import { Pass } from '../../pass';
import { GlobalToolbarInfo } from '../../globalToolbarInfo';

import { PassService } from '../../Service/pass.service';
import { AuthentificationService } from '../../Service/authentification.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';

import Swal from "sweetalert2";


@Component({
  selector: 'app-pass-detail',
  templateUrl: './pass-detail.component.html',
  styleUrls: ['./pass-detail.component.css']
})
export class PassDetailComponent implements OnInit {

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
    passOrigin: "Origine du passeport",
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
    eyesColor: 'Color of eyes',
    dateOfExpiry: "Date of expiry",
    dateOfIssue: 'Date of issue',
    passOrigin: "Passeport origine",
    id: "ID",
    signature: "Holder's signature"
  };

  constructor(private global: GlobalToolbarInfo, private pS: PassService, private userInfo: AuthentificationService, @Inject(SESSION_STORAGE) private storage: WebStorageService) {
  }

  ngOnInit() {
    this.global.tbInfo = 'citoyen';
    this.passNb = this.userInfo.getPassNb();
    console.log("lol!!!! passNb: " + this.passNb);
    this.getPass(this.passNb);

  }


  time() { 
    let timesplitted = this.pass.dateOfExpiry.toString().split('/', 3);
    let dateOfExpiry = new Date(timesplitted[1] + '/' + timesplitted[0] + '/' + timesplitted[2]).getTime();
    let today = new Date().getTime();


    // tableau des différences en jour, mois et années
    let differencetab = [Math.ceil((dateOfExpiry - today) / (1000 * 3600 * 24)), Math.ceil((dateOfExpiry - today) / (1000 * 3600 * 24 * 30)), Math.ceil((dateOfExpiry - today) / (1000 * 3600 * 24 * 30 * 12))];


    if (differencetab[0] <= 0) {
      var message = "Votre passeport est périmé."
    } else {
      var message = "Votre passeport périme dans "
      //choix de la valeur 
      if (differencetab[0] < 30) {
        message += differencetab[0] + " jour(s)";
      } else if (differencetab[1] < 12) {
        message += differencetab[1] + " mois";
      } else {
        message += differencetab[2] + " an(s)";
      }
    }

    Swal.fire({
      title: 'Validité',
      text: message,
      type: 'info',
      confirmButtonText: 'Fermer',
      confirmButtonColor: '#2F404D',
    })

  }


  getPass(passNb: string): void {
    this.pS.getPassInfo(passNb)
      .subscribe(
        pass => {
        this.pass = pass.infos;
          this.id = pass.id;
          this.time();
        }
      );
  }

}
