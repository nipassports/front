import { Component, OnInit, Inject, Input ,ViewChild} from '@angular/core';
import { Pass } from '../../pass';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImageServiceService } from '../../image-service.service';
import { PassService } from '../../Service/pass.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { LyResizingCroppingImages, ImgCropperConfig } from '@alyle/ui/resizing-cropping-images';
import { LyTheme2 } from '@alyle/ui';
import {NgxImageCompressService} from 'ngx-image-compress';


const styles = {
  actions: {
    display: 'flex'
  },
  cropping: {
    maxWidth: '310px',
    height: '400px'
  },
  flex: {
    flex: 1
  }
};


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-modify-pass',
  templateUrl: './modify-pass.component.html',
  styleUrls: ['./modify-pass.component.css']
})
export class ModifyPassComponent implements OnInit {

  imgchanged = false;

  pass: Pass;
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  private error: any;
  selectedFile: ImageSnippet;
  private sub1 : Subscription;
  private sub2 : Subscription;
  private sub3 : Subscription;
  private image: Observable<string>;
  imgResultAfterCompress:string;
  buttonValue: string;

  classes = this.theme.addStyleSheet(styles);
  croppedImage?: string;
  @ViewChild(LyResizingCroppingImages) img: LyResizingCroppingImages;
  result: string;
  myConfig: ImgCropperConfig = {
    width: 289, // Default `250`
    height: 372, // Default `200`,
    antiAliased:false,
    autoCrop: true,
    output: {
      width: 413,
      height: 531,
    }
  };

  onCropped(e) {
    this.croppedImage = e.dataURL;
    console.warn('Size in bytes was:', this.imageCompress.byteCount(this.croppedImage));
    this.imageCompress.compressFile(this.croppedImage,1,100,25)
    .then( result => {
      this.imgResultAfterCompress = result;
      console.warn('Size in bytes is now:', this.imageCompress.byteCount(result))        }
      );;
    console.log(e,e.size);
  }
  onloaded(e) {
    console.log('img loaded', e);
  }
  onerror(e) {
    console.warn(`'${e.name}' is not a valid image`, e);
  }

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


  constructor(private formBuilder: FormBuilder, private imageService: ImageServiceService, private router: Router,
    private pS: PassService,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,private theme: LyTheme2,private imageCompress: NgxImageCompressService) { }


  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      photo: [''],
      // signature: [''],
      passOrigin: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      sex: ['', Validators.required],
      countryCode: ['', Validators.required],
      height: ['', Validators.required],
      passNb: [ {value: '', disabled: true}, Validators.required],
      dateOfBirth: ['', Validators.required],
      eyesColor: ['', Validators.required],
      placeOfBirth: ['', Validators.required],
      residence: ['', Validators.required],
      autority: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      dateOfExpiry: ['', Validators.required],
      nationality: ['', Validators.required],
    });


   Swal.fire({

      // Initialisation
      type: "info",
      text: 'Veuillez renseigner le numéro de passeport à modifier',
      input: "text",

      inputPlaceholder: "ex: 14ML52147",

      confirmButtonText: 'Valider',
      cancelButtonText: 'Retour',

      showCancelButton: true,
      reverseButtons: true,

      cancelButtonColor: '#2F404D',
      confirmButtonColor: '#2F404D',

      showLoaderOnConfirm: true,

      // Traitement

      // Check si l'input est rempli
      inputValidator: (value) => {
        if (!value) {
          return 'Un numéro de passeport est nécessaire !'
        }
      },

      // Vérifie si le passeport existe
      preConfirm: (data) => {
        console.log("Modify pass: " + data);
        
        Swal.fire({
          html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
          showConfirmButton: false,
          allowOutsideClick: false,
        })

        this.sub1 = this.pS.getPassInfoGouv(data)
          .pipe(first())
          .subscribe(

            (pass) => {
              this.loading = true;
              console.log(" modify pass info: " + pass.infos);
              if (pass.infos !== undefined) {
                this.pass = pass.infos; console.log(" modify pass info: " + this.pass.autority);



                console.log(this.pass.dateOfBirth)

                let dateOfBirth = this.normalDate(this.pass.dateOfBirth);
                let dateOfIssue = this.normalDate(this.pass.dateOfIssue);
                let dateOfExpiry = this.normalDate(this.pass.dateOfExpiry);

                this.loginForm.patchValue({
                  passOrigin: this.pass.passOrigin,
                  type: this.pass.type,
                  name: this.pass.name,
                  surname: this.pass.surname,
                  sex: this.pass.sex,
                  countryCode: this.pass.countryCode,
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

                console.log(this.loginForm.value);
                this.img.setImageUrl(this.pass.image);


              }
              else {

                console.log(" modify pass info: undefined");

                Swal.fire({
                  type: 'warning',
                  title: 'Le Passeport est introuvable !',
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

          ) // Fin suscribe
      }, // Fin preConfirm


    }) //Fin de Swal.fire
      .then(reason => {
        console.log(" modify pass exit: " + reason.dismiss + " Swal.DismissReason.cancel: " + Swal.DismissReason.cancel);
        if (reason.dismiss === Swal.DismissReason.cancel) {
          this.router.navigate(['/Espace_Gouvernement']);
        }

      });
  }

  // ngOnDestroy(){
  //   this.sub1.unsubscribe();
  //   this.sub2.unsubscribe();
  //   this.sub3.unsubscribe();
  // }

  get f() { return this.loginForm.controls; }


  processFile(imageInput: any) {
    this.imgchanged = true;

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


  normalDate(date: string): string {
    let splitDate = date.split('/');
    const year = splitDate[2];
    const month = splitDate[1];
    const day = splitDate[0];
    const trueDate = year + "-" + month + "-" + day;
    return trueDate;
  }

  euroDate(date: string): string {
    let splitDate = date.split('-');

    if( splitDate.indexOf("/") !== -1 ){
      return  date;
    }
    const year = splitDate[0];
    const month = splitDate[1];
    const day = splitDate[2];
    const euDate = day + "/" + month + "/" + year;

    console.log("add pass DATE: "+ euDate);
    return euDate;
  }

  onSubmit() {

    console.log("button value: " + this.buttonValue)

    if (this.buttonValue === "rechercher") {

      Swal.fire({

        // Initialisation
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
  
        showLoaderOnConfirm: true,
  
        // Traitement
  
        // Check si l'input est rempli
        inputValidator: (value) => {
          if (!value) {
            return 'Un numéro de passeport est nécessaire !'
          }
        },
  
        // Vérifie si le passeport existe
        preConfirm: (data) => {

          Swal.fire({
            html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
            showConfirmButton: false,
            allowOutsideClick: false,
          })  

          this.sub2 = this.pS.getPassInfoGouv(data)
            .pipe(first())
            .subscribe(
  
              (pass) => {
                this.loading = true;
                console.log(" modify pass info: " + pass.infos);
                if (pass.infos !== undefined) {
                  this.pass = pass.infos; console.log(" modify pass info: " + this.pass.autority);
  
  
  
                  console.log(this.pass.dateOfBirth)
  
                  let dateOfBirth = this.normalDate(this.pass.dateOfBirth);
                  let dateOfIssue = this.normalDate(this.pass.dateOfIssue);
                  let dateOfExpiry = this.normalDate(this.pass.dateOfExpiry);
  
                  this.loginForm.patchValue({
                    passOrigin: this.pass.passOrigin,
                    type: this.pass.type,
                    name: this.pass.name,
                    surname: this.pass.surname,
                    sex: this.pass.sex,
                    countryCode: this.pass.countryCode,
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
  
                  console.log(this.loginForm.value);
                  this.img.setImageUrl(this.pass.image);
  
                  Swal.fire({
                    type: "success"
                  })  
  
                }
                else {
                  console.log(" modify pass info: undefined");
  
                  Swal.fire({
                    type: 'warning',
                    title: 'Le Passeport est introuvable !'
                  })
  
                }
              },
  
  
              (error) => {
                console.log(" modify pass info: ERROR: " + error.statusText);
  
                Swal.fire({
                  type: 'warning',
                  title: "Une erreur est survenu ! Veuillez ré-essayer ultérieurement."
                })
  
                this.pS.clean();
                this.router.navigate(['/Se connecter']);
              }
  
            ) // Fin suscribe


        }, // Fin preConfirm
  
      }) //Fin de Swal.fire

    }

    if (this.buttonValue === "valider") {

      this.submitted = true;

      if (this.loginForm.invalid) {
        return;
      }

      Swal.fire({
        html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
        showConfirmButton: false,
      })  

      this.loading = true;

      let dateOfBirth = this.euroDate(this.f.dateOfBirth.value);
      let dateOfIssue = this.euroDate(this.f.dateOfIssue.value);
      let dateOfExpiry = this.euroDate(this.f.dateOfExpiry.value);

      
      const pseudoPass = [

        this.f.type.value,
        this.f.countryCode.value,
        this.f.passNb.value,
        this.f.name.value,
        this.f.surname.value,
        dateOfBirth,
        this.f.nationality.value,
        this.f.sex.value,
        this.f.placeOfBirth.value,
        this.f.height.value,
        this.f.autority.value,
        this.f.residence.value,
        this.f.eyesColor.value,
        dateOfExpiry,
        dateOfIssue,
        this.f.passOrigin.value,
        "Valide",
        this.imgResultAfterCompress
      ]

      console.log("pseudo pass modify: "+ pseudoPass);
      this.sub3 = this.pS.modifyPass(pseudoPass)
      .pipe(first())
      .subscribe(
        id => {

          console.log("dataRequest: "+ id)
          
          this.pS.getResponseFromHttpRequestWithQueue(id.requestId)
          .then( 
            
            async (resp) => {
            
            console.log('connect: ' + JSON.stringify(resp));
            //console.log('connect: ' + resp.data.message);

            if (resp.processingResults === 'Transaction has been submitted') {
              
              Swal.fire({
                title: 'Passeport modifié !',
                type: 'success',
                confirmButtonText: 'Fermer',
                confirmButtonColor: '#2F404D',
                timer: 6000
})
            }

            else {
              Swal.fire({
                title: 'Problème',
                text: 'Veuillez réessayer.',
                type: 'error',
                confirmButtonText: 'Fermer',
                confirmButtonColor: '#2F404D',
                
              })
            }
          })
          .catch( error => {
            Swal.fire({
              type: 'warning',
              title: "Une erreur est survenu ! Veuillez réessayer ultérieurement.",
              confirmButtonColor: '#2F404D',
            })
          })

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

      );


    }
  }

}
