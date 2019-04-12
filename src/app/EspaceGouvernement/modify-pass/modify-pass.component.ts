import { Component, OnInit, Inject, Input } from '@angular/core';
import { Pass } from '../../pass';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageServiceService } from '../../image-service.service';
import { PassService } from '../../Service/pass.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Subscription, Subscriber } from 'rxjs';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-modify-pass',
  templateUrl: './modify-pass.component.html',
  styleUrls: ['./modify-pass.component.css']
})
export class ModifyPassComponent implements OnInit {

  imgchanged=false;

  private sub = Subscriber;
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
    private pS: PassService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService) { }
    

  ngOnInit() {
 
    Swal.fire({
      type: "info",
      text: 'Veuillez renseigner le numéro de passeport a modifier',
      input: "text",
      inputPlaceholder: "ex: 14ML52147",

      confirmButtonText: 'Valider', 
      cancelButtonText: 'Retour',

      showCancelButton: true,
      reverseButtons: true,

      cancelButtonColor: '#2F404D',
      confirmButtonColor: '#2F404D',

      preConfirm: (data) =>{
       
        this.getPass(data);
        
      }
    })     

    if ( this.pass !== null ){
      
      
      console.log(this.pass.dateOfBirth)

      let dateOfBirth = this.normalDate(this.pass.dateOfBirth);
      let dateOfIssue = this.normalDate(this.pass.dateOfIssue); 
      let dateOfExpiry = this.normalDate(this.pass.dateOfExpiry); 

      this.loginForm = this.formBuilder.group({
        photo: [this.pass.image,Validators.required],
        signature: [this.pass.image,Validators.required],
        passOrigin: [this.pass.passOrigin, Validators.required],
        type: [this.pass.passOrigin, Validators.required],
        name: [this.pass.name, Validators.required],
        surname: [this.pass.surname, Validators.required],
        sex: [this.pass.sex, Validators.required],
        countryCode: [this.pass.countryCode, Validators.required],
        height: [this.pass.height, Validators.required],
        passNb: [this.pass.passNb, Validators.required],
        dateOfBirth: [dateOfBirth, Validators.required],
        eyesColor: [this.pass.eyesColor, Validators.required],
        placeOfBirth: [this.pass.placeOfBirth, Validators.required],
        residence: [this.pass.residence, Validators.required],
        autority: [this.pass.autority, Validators.required],
        dateOfIssue: [dateOfIssue, Validators.required],
        dateOfExpiry: [dateOfExpiry, Validators.required],
        nationality: [this.pass.nationality, Validators.required],
      });
    
     }
     else{
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

  }

  get f() { return this.loginForm.controls; }
  
  getPass(passNb: string ): void {

    this.pS.getPassInfoGouv(passNb)
    .pipe(first())
    .subscribe( 
      pass => {this.pass = pass.infos;});

    // console.log("pass-detail:"+ this.storage.get("passInfo"));

  }

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

  onSubmit() {

    console.log("button value: " + this.buttonValue)

    if (this.buttonValue === "generate") {

      console.log("before generate: " + this.f.dateOfBirth.value)
      this.pS.getPassRandom()
        .subscribe(
          pass => {
            this.pass = pass;
            this.storage.set("passInfo",this.pass);
            console.log("pass-detail storage: " + JSON.stringify(this.storage.get("passInfo")));
            location.reload();
          },

          error => { console.log("pass-detail:ERROR " + error) }
        );  
      
        
    }

    if (this.buttonValue === "valider") {

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
        this.imageService.IMGbase64
      ]

      this.pS.addPass(pseudoPass)
        .pipe(first())
        .subscribe(
          data => {

            //console.log('connect: ' + data.message);

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
            // this.loading = false;
          }
        );
    }



  }
}
