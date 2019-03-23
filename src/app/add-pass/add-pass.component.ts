import { Component, OnInit } from '@angular/core';
import { PassService } from '../pass.service';



@Component({
  selector: 'app-add-pass',
  templateUrl: './add-pass.component.html',
  styleUrls: ['./add-pass.component.css']
})

export class AddPassComponent implements OnInit {

  passBar = [ 
    'Ajout du passeport'

  ];

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
    dateOfExpiry: 'Date of expiry',
    dateOfIssue: 'Date of issue',
    passOrigin: "Passeport origine",
    id: "ID",
    signature: "Holder's signature"
  };

  constructor( private passservice: PassService) { }

  ngOnInit() {
  }

  addPass(pseudoPass: any): void{
    console.log('Ajout du passeport');
    this.passservice.addPass(pseudoPass).subscribe(data =>{
      console.log(data);
    });
    console.log("Fin d'ajout");
  }
}
