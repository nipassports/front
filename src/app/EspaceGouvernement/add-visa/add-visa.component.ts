import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Subscription, generate } from 'rxjs';
import { PassService } from '../../Service/pass.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Pass } from '../../pass';

@Component({
  selector: 'app-add-visa',
  templateUrl: './add-visa.component.html',
  styleUrls: ['./add-visa.component.css']
})
export class AddVisaComponent implements OnInit {

  private error: any;
  private buttonValue: string;
  private submitted: boolean;
  private loginForm: FormGroup;
  private sub1: Subscription;
  private sub2: Subscription;
  private pass: Pass;
  loading = false;
  submettied = false;

  private visaInfos = [
    { label: 'Numéro de passeport', componentName: 'passNb', type: 'text' },
    { label: 'Validité', componentName: 'validity', type: 'select' },
    { label: 'Type', componentName: 'type', type: 'select' },
    { label: "Nombre d'entrée(s) dans le pays", componentName: 'entries', type: 'select' },
    { label: 'Code du Visa', componentName: 'visaCode', type: 'text' },
    { label: 'Pays de validité', componentName: 'validFor', type: 'text' },
    { label: 'Date de début de validité', componentName: 'dateOfIssue', type: 'date' },
    { label: 'Date de fin de validité', componentName: 'dateEnd', type: 'date' },
    { label: 'Durée du séjour', componentName: 'durationOfStay', type: 'number' },
    { label: "Pays de délivrance", componentName: 'placeOfIssue', type: 'text' },
    { label: "Autorité de délivrance du Visa", componentName: 'autority', type: 'text' },
    { label: "Nom", componentName: 'surname', type: 'text' },
    { label: 'Prénom', componentName: 'name', type: 'text' },
    { label: 'Remarques', componentName: 'remarks', type: 'text' }

  ]

  constructor(private formBuilder: FormBuilder, private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private pS: PassService) { }

  

  ngOnInit() {
    
    
    this.loginForm = this.formBuilder.group({
      validity: ['', Validators.required],
      visaCode: ['', Validators.required],
      validFor: ['', Validators.required],
      dateOfIssue: ['', Validators.required],
      type: ['', Validators.required],
      dateEnd: ['', Validators.required],
      entries: ['', Validators.required],
      durationOfStay: ['', Validators.required],
      placeOfIssue: ['', Validators.required],
      autority: ['', Validators.required],
      surname: [{ value: '', disabled: true }, Validators.required],
      name: [{ value: '', disabled: true }, Validators.required],
      remarks: [' ', Validators.required],
      passNb: [{ value: '', disabled: true }, Validators.required]
    });
    Swal.fire({

      // Initialisation
      type: "info",
      text: 'Veuillez renseigner le numéro de passeport pour ajouter un visa',
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
        console.log("Add visa: " + data);

        Swal.fire({
          html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
          showConfirmButton: false,
          allowOutsideClick: false,
        })

        this.sub1 = this.pS.getPassInfoGouv(data)
          .pipe(first())
          .subscribe(

            (pass) => { /* Chargement des infos necessaires */
              this.loading = true;
              if (pass.infos !== undefined) {
                this.pass = pass.infos;

                this.loginForm.patchValue({
                  name: this.pass.name,
                  surname: this.pass.surname,
                  passNb: this.pass.passNb,
                })
              }
              else {
                console.log(" add visa info: undefined");
                Swal.fire({
                  type: 'warning',
                  title: 'Le Passeport est introuvable !',
                })

              }
            },


            async (error) => {
              console.log(" add visa info: ERROR: " + error.error.message);

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
          ) // Fin suscribe
      }, // Fin preConfirm
    }) //Fin de Swal.fire
      .then(reason => {
        console.log(" add visa exit: " + reason.dismiss + " Swal.DismissReason.cancel: " + Swal.DismissReason.cancel);
        if (reason.dismiss === Swal.DismissReason.cancel) {
          this.router.navigate(['/Espace_Gouvernement']);
        }
      });

  }

  get f() { return this.loginForm.controls; }

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

  getComponentTypeSelect(value: string): boolean {

    if (value === 'select') {
      return true;
    }
    else
      return false;

  }

  getComponentName(value: string): string {
    return value;
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

  onSubmit() {
    if (this.buttonValue === "valider") {

      this.submitted = true;

      console.log("submitted: " + this.loginForm.invalid);
      if (this.loginForm.invalid) {
        console.log("PB");
        return;
      }

      Swal.fire({
        html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
        showConfirmButton: false,
      })

      console.log("ok");

      let dateOfIssue = this.euroDate(this.f.dateOfIssue.value);
      let dateOfExpiry = this.euroDate(this.f.durationOfStay.value);

      const visaInfo = [
        this.f.type.value,
        this.f.visaCode.value,
        this.f.passNb.value,
        this.f.name.value,
        this.f.surname.value,
        this.f.autority.value,
        this.f.dateEnd.value,
        dateOfIssue,
        this.f.placeOfIssue.value,
        this.f.validity.value,
        this.f.validFor.value,
        this.f.entries.value,
        dateOfExpiry,
        this.f.remarks.value
      ];

      this.sub2 = this.pS.addVisa(visaInfo)
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

                    Swal.fire({
                      title: 'Visa ajouté !',
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
              .catch(error => {
                Swal.fire({
                  type: 'warning',
                  title: "Une erreur est survenu ! Veuillez réessayer ultérieurement.",
                  confirmButtonColor: '#2F404D',
                })
              })

          },

          async (error) => {
            console.log(" modify pass info: ERROR: " + error.error.message);

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
        )

    }


  }
}
