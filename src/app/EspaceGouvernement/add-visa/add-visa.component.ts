import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { TrustedString } from '@angular/core/src/sanitization/bypass';

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
  private visaInfos = [

    { label: 'Validité', componentName: 'validity' },
    { label: 'Code du Visa', componentName: 'visaCode' },
    { label: 'Pays de validités', componentName: 'validFor' },
    { label: 'Date de début de validité', componentName: 'dateOfIssue' },
    { label: 'Date de fin de validité', componentName: 'dateEnd' },
    { label: 'Type', componentName: 'type' },
    { label: "Nombre d'entrée(s) dans le pays", componentName: 'entries' },
    { label: 'Durée du séjour', componentName: 'durationOfStay' },
    { label: "Pays de délivrance", componentName: 'placeOfIssue' },
    { label: "Autorité de délivrance du Visa", componentName: 'autority' },
    { label: "Nom", componentName: 'surname' },
    { label: 'Prénom', componentName: 'name' },
    { label: 'Remarques', componentName: 'remarks' }

  ]

  constructor(private formBuilder: FormBuilder) { }

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
      placeOremarksfBirth: ['', Validators.required],
      remarks: [''],
    });
  }

  get f() { return this.loginForm.controls; }

  buttonClicked(value: string): void {
    this.buttonValue = value;
    console.log("buttonClicked value: " + value);
  }

  getComponentError(value: string): boolean {
    console.log("getComponentError value: " + value);
    //let a = `${this.gouvUrl}/all/${countryCode}`
    console.log("getComponentError error: " + `this.f.${value}.errors`);
    let err = `this.f.${value}.errors`;
    if (this.submitted === true && err){
      console.log(" TRUE ")
      return true;
    }
    else
      return false;
  }

  getComponentErrorRequired(value: string): boolean{
    let err = `this.f.${value}.errors.required`;
    if (this.submitted === true && err){
      console.log(" TRUE ")
      return true;
    }
    else
      return false;
  }

  onSubmit() {


    if (this.buttonValue === "generate") {

    }

    if (this.buttonValue === "valider") {

      console.log("ok")
      this.submitted = true;

      if (this.loginForm.invalid) {
        return;
      }

    }


  }
}
