import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassService } from '../../Service/pass.service';
import { first } from 'rxjs/operators';




@Component({
  selector: 'app-add-pass',
  templateUrl: './add-pass.component.html',
  styleUrls: ['./add-pass.component.css']
})

export class AddPassComponent implements OnInit {

  loginForm: FormGroup;
  valid: boolean;
  submitted = false;
  loading = false;
  private error: any;

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
    sex: 'Sexe',
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

  constructor(private passservice: PassService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      photo: ['', Validators.required],
      signature: ['', Validators.required],
      passOrigin: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      sex: ['', Validators.required],
      countryCode: ['', Validators.required],
      height: ['', Validators.required],
      passNb: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      eyesColor: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      residence: ['', Validators.required],
      autority: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      dateOfExpiry: ['', Validators.required],
      nationality: ['', Validators.required],
    });
  }

  get f() { return this.loginForm.controls; }

  addPass(pseudoPass: any): void {
    console.log('Ajout du passeport');
    this.passservice.addPass(pseudoPass).subscribe(data => {
      console.log(data);
    });
    console.log("Fin d'ajout");
  }

  onSubmit() {

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const pseudoPass = [

      this.f.type.value,
      this.f.countryCode.value,
      this.f.passNb.value,
      this.f.name.value,
      this.f.surname.value,
      this.f.dateOfBirth.value,
      this.f.nationality.value,
      this.f.sex.value,
      this.f.placeOfBirth.value,
      this.f.height.value,
      this.f.autority.value,
      this.f.residence.value,
      this.f.eyesColor.value,
      this.f.dateOfExpiry.value,
      this.f.dateOfIssue.value,
      this.f.passOrigin.value,
      "Valide",
      "test-image"
    ]

    this.passservice.addPass(pseudoPass)
      .pipe(first())
      .subscribe(
        data => {

          console.log('coucou: ' + JSON.stringify(data));

          //console.log('connect: ' + data.message);

          if (data.message === 'Transaction has been submitted') {
            alert("Le passeport a bien été ajouté !\n\n   Identifiant: " + this.f.passNb.value +
              "\n   Mot de passe: " + data.password);
              this.loading = false;
          }

          else {
            alert("Un problème est survenu, veuillez réessayer")
          }
        },

        error => {
          console.log('ERROR: ' + JSON.stringify(error));
          this.error = JSON.stringify(error);
          // this.loading = false;
        }
      );






    // console.log( 
    //   "Submitted: "+ this.submitted +
    //   "\nPhoto: "+ this.f.photo.value +
    //   "\n Signature: "+  this.f.signature.value+
    //   "\nPassOrigin: "+ this.f.passOrigin.value+
    //   "\ntype: "+ this.f.type.value+
    //   "\nsurname: "+this.f.surname.value);




  }
}
