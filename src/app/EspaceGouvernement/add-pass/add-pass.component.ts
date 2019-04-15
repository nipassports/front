import { Component, OnInit, Input, Directive, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassService } from '../../Service/pass.service';
import { first } from 'rxjs/operators';
import{ImageServiceService}from '../../image-service.service'
import { Pass } from '../../pass';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-add-pass',
  templateUrl: './add-pass.component.html',
  styleUrls: ['./add-pass.component.css']
})


export class AddPassComponent implements OnInit {
  imgchanged=false;

  pass: Pass;
  loginForm: FormGroup;
  valid: boolean;
  submitted = false;
  loading = false;
  private error: any;
  selectedFile: ImageSnippet;

  buttonValue: string;

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


  constructor( private formBuilder: FormBuilder, private imageService:ImageServiceService,
    private pS: PassService, private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {

      this.loginForm = this.formBuilder.group({
        photo: ['', Validators.required],
        signature: ['', Validators.required],
        passOrigin: ['', Validators.required],
        type: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        sex: ['', Validators.required],
        countryCode: [{value: '', disabled: true}, Validators.required],
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
  
  processFile(imageInput: any) {
    this.imgchanged=true;

    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imageService.loadImage(this.selectedFile.src)
    });

    reader.readAsDataURL(file);
  }

  addPass(pseudoPass: any): void {
    console.log('Ajout du passeport');
    this.pS.addPass(pseudoPass).subscribe(data => {
      console.log(data);
    });
    console.log("Fin d'ajout");
  }

  buttonClicked(value: string): void {
    this.buttonValue = value;
    console.log("buttonClicked value: " + value);
  }


  normalDate(date:string): string{
    let splitDate = date.split('/');
    const year  = splitDate[2];
    const month = splitDate[1];
    const day = splitDate[0];
    const trueDate = year+"-"+month+"-"+day;
    return trueDate;
  }

  async onSubmit() {

    console.log("button value: " + this.buttonValue)

    if (this.buttonValue === "generate") {

      Swal.fire({
        html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
        showConfirmButton: false,
      })  

      console.log("before generate: " + this.f.dateOfBirth.value)
      await this.pS.getPassRandom()
        .subscribe(
          pass => {
            this.pass = pass;
            
            let dateOfBirth = this.normalDate(this.pass.dateOfBirth);
            let dateOfIssue = this.normalDate(this.pass.dateOfIssue);
            let dateOfExpiry = this.normalDate(this.pass.dateOfExpiry);
    
            this.loginForm.patchValue({
              passOrigin: 'France',
              type: 'P',
              name: this.pass.name,
              surname: this.pass.surname,
              sex: this.pass.sex,
              countryCode: this.pS.getCountryCode(),
              height: this.pass.height,
              passNb: this.pass.passNb,
              dateOfBirth: dateOfBirth,
              eyesColor: this.pass.eyesColor,
              placeOfBirth: this.pass.placeOfBirth,
              residence: this.pass.residence,
              autority: this.pass.autority,
              dateOfIssue: dateOfIssue,
              dateOfExpiry: dateOfExpiry,
              nationality: this.pass.nationality
            })

            Swal.fire({
              type: 'success',
              text: 'Le passeport a bien été généré !',
              confirmButtonColor: '#2F404D',
            })  
           
          },

          error => { console.log("pass-detail:ERROR " + JSON.stringify(error)) }
        );  
    
    }

    if (this.buttonValue === "valider") {

      this.submitted = true;

      if (this.loginForm.invalid) {
        return;
      }

      Swal.fire({
        html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
        showConfirmButton: false,
        allowOutsideClick: () => !Swal.isLoading(),
      })  
      
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
        this.imageService.IMGbase64
      ]
      console.log("pseudo pass: "+ pseudoPass);
      this.pS.addPass(pseudoPass)
        .pipe(first())
        .subscribe(
          data => {

            console.log('connect: ' + data.message);

            if (data.message === 'Transaction has been submitted') {
              var message : string; 
              message = "<b> Identifiant: </b> " + this.f.passNb.value +
              "<br> <b> Mot de passe:</b> " + data.password; 
              Swal.fire({
                title: 'Passeport ajouté !',
                html: message,
                type: 'success',
                confirmButtonText: 'Fermer', 
                confirmButtonColor: '#2F404D',
                timer : 6000
              })             
              this.loading = false;
            }

            else {
              Swal.fire({
                title: 'Problème',
                text: 'Veuillez ré-essayer.',
                type: 'error',
                confirmButtonText: 'Fermer', 
                confirmButtonColor: '#2F404D',
                timer : 6000
              })   
            }
          },

          error => {
            console.log('ERROR: ' + JSON.stringify(error));
            this.error = JSON.stringify(error);
            Swal.fire({
              text: "Une erreur est survenu ! Veuillez ré-essayer ultérieurement.",
              type: 'warning',
              confirmButtonText: 'Fermer',
              confirmButtonColor: '#2F404D',
              timer: 6000
            })
            // this.pS.clean();
            // this.router.navigate(['/Se connecter']);
          }
        );
    }
  }
}
