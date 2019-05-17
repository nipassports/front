import { Component, OnInit, Inject } from '@angular/core';
import { Pass_json } from '../../pass_json';
import { PassService } from '../../Service/pass.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-pass-list',
  templateUrl: './pass-list.component.html',
  styleUrls: ['./pass-list.component.css']
})

export class PassListComponent implements OnInit {

  Allpass: Pass_json[];
  fakeArray = new Array(16);
  searchForm: FormGroup;
  private buttonValue: string;
  private loading: boolean = true;

  private infos = [
    { label: 'Validité', componentName: 'validity', type: 'select' },
    { label: 'Type', componentName: 'type', type: 'select' },
    { label: "Origine du passeport", componentName: 'passOrigin', type: 'select' },
    { label: 'Sexe', componentName: 'sex', type: 'select' },
    { label: 'Taille', componentName: 'height', type: 'number' },
    { label: 'Date de naissance', componentName: 'dateOfBirth', type: 'date' },
    { label: 'Lieu de naissance', componentName: 'placeOfBirth', type: 'text' },
    { label: 'Domicile', componentName: 'residence', type: 'text' },
    { label: "Couleur des yeux", componentName: 'eyesColor', type: 'text' },
    { label: "Autorité de délivrance du passeport", componentName: 'autority', type: 'text' },
    { label: "Nom", componentName: 'surname', type: 'text' },
    { label: 'Prénom', componentName: 'name', type: 'text' },
    { label: 'Nationalité', componentName: 'nationality', type: 'text' },
    { label: 'Date de délivrance', componentName: 'dateOfIssue', type: 'date' },
    { label: "Date d'expiration", componentName: 'dateOfExpiry', type: 'date' },

  ]


  constructor(private pS: PassService, private formBuilder: FormBuilder,
    private router: Router) { }


  ngOnInit() {
    this.getAllPassGouv();

    this.searchForm = this.formBuilder.group({
      passOrigin: "",
      type: "",
      name: "",
      surname: "",
      sex: "",
      height: "",
      passNb: "",
      dateOfBirth: "",
      eyesColor: "",
      placeOfBirth: "",
      residence: "",
      autority: "",
      dateOfIssue: "",
      dateOfExpiry: "",
      nationality: "",
      validity: ""
    });
  }

  getAllPassGouv(): void {

    // this.Allpass$ = this.searchTerms.pipe(
    //   switchMap(
    //     () => this.pS.getAllPassGouv(),
    //   ));

    // this.Allpass$.subscribe(

    //   (Allpass) => { },

    //   async (error) => {
    //     console.log(" modify pass info: ERROR: " + error.error.message);

    //     if (error.error.message === "Auth failed") {
    //       await Swal.fire({
    //         type: 'warning',
    //         title: "Votre session vient d'expirer !",
    //         confirmButtonColor: '#2F404D',
    //       })

    //       this.pS.clean();
    //       this.router.navigate(['/Se_connecter']);
    //     }
    //     else {
    //       Swal.fire({
    //         type: 'warning',
    //         title: "Une erreur est survenu ! Veuillez ré-essayer ultérieurement.",
    //         confirmButtonColor: '#2F404D',
    //       })
    //     }
    //   }

    // );

    this.pS.getAllPassGouv()
      .subscribe(
        (Allpass) => {
          this.Allpass = Allpass;
          console.log("Allpass1: "+ JSON.stringify(Allpass))
          this.loading = false;
        },

        async (error) => {
          console.log(" pass list info: ERROR: " + error.error.message);

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

        });

    console.log("pass-list: " + JSON.stringify(this.Allpass));

  }

  getComponentName(value:string): string{
    return value;
  }

  getComponentTypeSelect(value:string): boolean{

    if (value === 'select'){
      return true;
    }
    else
      return false;

  }
  
  buttonClicked(value: string): void {
    this.buttonValue = value;
    console.log("buttonClicked value: " + value);
  }
  
  reset(){
    this.searchForm.patchValue({
      passOrigin: "",
      type: "",
      name: "",
      surname: "",
      sex: "",
      height: "",
      passNb: "",
      dateOfBirth: "",
      eyesColor: "",
      placeOfBirth: "",
      residence: "",
      autority: "",
      dateOfIssue: "",
      dateOfExpiry: "",
      nationality: "",
      validity: ""
    })
  }

  get f() { return this.searchForm.controls; }

  searchPass() {

    
    console.log("buttonValue: "+ this.buttonValue);
    if(this.buttonValue === "reset"){
      this.reset();
      this.buttonValue = "rechercher";
      return;
    }
    else{

      Swal.fire({
        html: '<img class="charge" *ngIf="loading" src="../../../assets/img/loading_nip.gif" />',
        showConfirmButton: false,
        allowOutsideClick: false,
      })

      let research = [

        this.f.type.value,
        this.f.autority.value,
        this.f.passNb.value,
        this.f.name.value,
        this.f.surname.value,
        this.f.dateOfBirth.value,
        this.f.nationality.value,
        this.f.sex.value,
        this.f.placeOfBirth.value,
        this.f.height.value,
        this.f.residence.value,
        this.f.eyesColor.value,
        this.f.dateOfExpiry.value,
        this.f.dateOfIssue.value,
        this.f.passOrigin.value,
        this.f.validity.value,
      ]
  
      console.log(research)
      this.pS.govSearch(research)
      .pipe(first())
      .subscribe(
        (Allpass) => {
          console.log("Allpass2: "+ JSON.stringify(Allpass))
          this.Allpass = Allpass;
          Swal.fire({
            type: 'success',
            timer: 1,
            showConfirmButton: false,
          });
        },
  
        async (error) => {
          console.log(" pass list info: ERROR: " + error.error.message);
  
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
  
        });
    }

  }

}
