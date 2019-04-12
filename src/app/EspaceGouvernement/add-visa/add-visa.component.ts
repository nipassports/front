import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Subscription } from 'rxjs';
import { PassService } from '../../Service/pass.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

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
  private sub : Subscription;

  private visaInfos = [
    { label: 'Numéro de passeport', componentName: 'passNb', type:'text' },
    { label: 'Validité', componentName: 'validity', type:'select' },
    { label: 'Type', componentName: 'type', type:'select' },
    { label: "Nombre d'entrée(s) dans le pays", componentName: 'entries', type:'select' },
    { label: 'Code du Visa', componentName: 'visaCode', type:'text' }, 
    { label: 'Pays de validités', componentName: 'validFor', type:'text' },
    { label: 'Date de début de validité', componentName: 'dateOfIssue', type:'date' },
    { label: 'Date de fin de validité', componentName: 'dateEnd', type:'date' },
    { label: 'Durée du séjour', componentName: 'durationOfStay', type:'number' },
    { label: "Pays de délivrance", componentName: 'placeOfIssue', type:'text' },
    { label: "Autorité de délivrance du Visa", componentName: 'autority', type:'text' },
    { label: "Nom", componentName: 'surname', type:'text' },
    { label: 'Prénom', componentName: 'name', type:'text' },
    { label: 'Remarques', componentName: 'remarks', type:'text' }

  ]

  constructor(private formBuilder: FormBuilder,
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
      surname: ['', Validators.required],
      name: ['', Validators.required],
      remarks: [' ', Validators.required],
      passNb: [this.pS.getPassNumb(), Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  buttonClicked(value: string): void {
    this.buttonValue = value;
    console.log("buttonClicked value: " + value);
  }

  getComponentError(value: any): boolean {
    //console.log("getComponentError value: " + value);
    // let controle = this.f.value ;
    // console.log("getComponentError error: " + controle.errors);
  
    if ( (this.submitted === true) && (this.loginForm.get(value).errors !== null) ){
      return true;
    }
    else
      return false;
  }

  getComponentErrorRequired(value: any): boolean{
    
    // let controle = this.f.value ;
    if ((this.submitted === true) && (this.loginForm.get(value).errors.required !== null) ){
      return true;
    }
    else
      return false;
  }

  getComponentTypeSelect(value:string): boolean{

    if (value === 'select'){
      return true;
    }
    else
      return false;

  }

  getComponentName(value:string): string{
    return value;
  }

  onSubmit() {


    // if (this.buttonValue === "generate") {

    // }

    if (this.buttonValue === "valider") {

      this.submitted = true;

      console.log("submitted: "+ this.loginForm.invalid);
      if (this.loginForm.invalid) {
        console.log("PB");
        return;
      }

      Swal.fire({
        html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
        showConfirmButton: false,
      })  

      console.log("ok");
      const visaInfo = [
        this.f.type.value,
        this.f.visaCode.value,
        this.f.passNb.value ,
        this.f.name.value ,
        this.f.surname.value ,
        this.f.autority.value ,
        this.f.dateEnd.value ,
        this.f.dateOfIssue.value ,
        this.f.placeOfIssue.value ,
        this.f.validity.value  ,
        this.f.validFor.value  ,
        this.f.entries.value  ,
        this.f.durationOfStay.value,
        this.f.remarks.value
      ];

      this.sub = this.pS.addVisa(visaInfo)
      .pipe(first())
        .subscribe(
          (data: any) => {
            console.log('addVisa: ' + JSON.stringify(data));

            //console.log('connect: ' + data.message);

            if (data.message === 'Transaction has been submitted') {
              var message : string;  
              Swal.fire({
                title: 'Visa ajouté !',
                html: message,
                type: 'success',
                confirmButtonText: 'Fermer', 
                confirmButtonColor: '#2F404D'
              })             
       
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

          (error: any) =>{
            console.log("ERROR: "+ JSON.stringify(error));
            
            Swal.fire({
              title: 'Problème',
              text: 'Veuillez ré-essayer.',
              type: 'error',
              confirmButtonText: 'Fermer', 
              confirmButtonColor: '#2F404D',
              timer : 6000
            })   
          }
        )

    }


  }
}
