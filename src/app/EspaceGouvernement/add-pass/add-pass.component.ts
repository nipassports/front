import { Component, OnInit, Input, Directive, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassService } from '../../Service/pass.service';
import { first } from 'rxjs/operators';
import { ImageServiceService } from '../../image-service.service'
import { Pass } from '../../pass';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { LyResizingCroppingImages, ImgCropperConfig } from '@alyle/ui/resizing-cropping-images';
import { LyTheme2 } from '@alyle/ui';
import { NgxImageCompressService } from 'ngx-image-compress';


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
  selector: 'app-add-pass',
  templateUrl: './add-pass.component.html',
  styleUrls: ['./add-pass.component.css'],

})


export class AddPassComponent implements OnInit {
  imgchanged = false;

  pass: Pass;
  loginForm: FormGroup;
  valid: boolean;
  submitted = false;
  private error: any;
  selectedFile: ImageSnippet;
  imageChangedEvent: any = '';
  generateUser: string;

  imgResultAfterCompress: string;
  buttonValue: string;
  classes = this.theme.addStyleSheet(styles);
  croppedImage?: string;
  @ViewChild(LyResizingCroppingImages) img: LyResizingCroppingImages;
  result: string;
  myConfig: ImgCropperConfig = {
    width: 289, // Default `250`
    height: 372, // Default `200`,
    antiAliased: false,
    autoCrop: true,
    output: {
      width: 413,
      height: 531,
    }
  };

  onCropped(e) {
    this.croppedImage = e.dataURL;
    console.warn('Size in bytes was:', this.imageCompress.byteCount(this.croppedImage));
    this.imageCompress.compressFile(this.croppedImage, 1, 100, 25)
      .then(result => {
        this.imgResultAfterCompress = result;
        console.warn('Size in bytes is now:', this.imageCompress.byteCount(result))
      }
      );;
    console.log(e, e.size);
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
    passOrigin: "Pass origine",
    id: "ID",
    signature: "Holder's signature"
  };


  constructor(private formBuilder: FormBuilder, private imageService: ImageServiceService,
    private pS: PassService, private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService, private theme: LyTheme2, 
    private imageCompress: NgxImageCompressService) { }

    
  ngOnInit() {
    this.generateUser = this.storage.get('passNb');

    this.loginForm = this.formBuilder.group({
      // photo: ['', Validators.required],
      // signature: ['', Validators.required],
      passOrigin: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      sex: ['', Validators.required],
      countryCode: [{ value: this.storage.get("countryCode"), disabled: true }],
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

    console.log("err: " + JSON.stringify(this.f.nationality.errors) + "/" + JSON.stringify(this.f.nationality.errors.required));

    this.loginForm.patchValue({

      dateOfBirth: this.normalDate('29/05/1996'),
      dateOfIssue: this.normalDate('29/05/2019'),
      dateOfExpiry: this.normalDate('29/05/2020')
    })
  }



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

  getComponentError(value: any): boolean {
    if ((this.submitted === true) && (this.loginForm.get(value).errors !== null)) {
      return true;
    }
    else
      return false;
  }

  getComponentErrorRequired(value: any): boolean {
    if ((this.submitted === true) && (this.loginForm.get(value).errors.required !== null)) {
      return true;
    }
    else
      return false;
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

    if (splitDate.indexOf("/") !== -1) {
      return date;
    }
    const year = splitDate[0];
    const month = splitDate[1];
    const day = splitDate[2];
    const euDate = day + "/" + month + "/" + year;

    console.log("add pass DATE: " + euDate);
    return euDate;
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

          async (error) => {
            console.log(" modify pass info: ERROR: " + error.error.message);

            if (error.error.message === "Auth failed") {
              await Swal.fire({
                type: 'warning',
                title: "Votre session vient d'expirer !",
                confirmButtonColor: '#2F404D',
              })

              this.pS.clean();
              this.router.navigate(['/Se_connecter']);
            }
            else {
              Swal.fire({
                type: 'warning',
                title: "Une erreur est survenu ! Veuillez ré-essayer ultérieurement.",
                confirmButtonColor: '#2F404D',
              })
            }

          }
        );

    }

    if (this.buttonValue === "valider") {

      this.submitted = true;

      console.log("err: " + this.submitted);

      if (this.loginForm.invalid) {
        console.log("invalid")
        return;
      }

      Swal.fire({
        html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
        showConfirmButton: false,
        allowOutsideClick: false,
      })


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

      console.log("Pseudo PAss: " + pseudoPass);

      this.pS.addPass(pseudoPass)
        .pipe(first())
        .subscribe(
          id => {

            console.log("dataRequest: " + id)

            this.pS.getResponseFromHttpRequestWithQueue(id.requestId)
              .then(

                async (resp) => {

                  console.log('connect: ' + JSON.stringify(resp));
                  //console.log('connect: ' + resp.data.message);

                  if (resp.processingResults === 'Transaction has been submitted') {
                    var message: string;
                    message = "<b> Identifiant: </b> " + resp.data.passNb +
                      "<br> <b> Mot de passe:</b> " + resp.data.password;
                    await Swal.fire({
                      title: 'Passeport ajouté !',
                      html: message,
                      type: 'success',
                      confirmButtonText: 'Fermer',
                      confirmButtonColor: '#2F404D',

                    })
                    this.router.navigate(['/Espace_Gouvernement']);
                  }

                  else {
                    Swal.fire({
                      title: 'Problème',
                      text: 'Veuillez ré-essayer.',
                      type: 'error',
                      confirmButtonText: 'Fermer',
                      confirmButtonColor: '#2F404D',

                    })
                  }
                })
              .catch(error => {
                Swal.fire({
                  type: 'warning',
                  title: "Une erreur est survenu ! Veuillez ré-essayer ultérieurement.",
                  confirmButtonColor: '#2F404D',
                })
              })

          },

          async (error) => {
            console.log(" add pass info: ERROR: " + error.error.message);

            if (error.error.message === "Auth failed") {
              await Swal.fire({
                type: 'warning',
                title: "Votre session vient d'expirer !",
                confirmButtonColor: '#2F404D'
              })

              this.pS.clean();
              this.router.navigate(['/Se_connecter']);
            }
            else {
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
