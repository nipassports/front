import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule }    from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StorageServiceModule} from 'angular-webstorage-service';


import { AccueilComponent } from './accueil/accueil.component';
import { ChooseComponent } from './choose/choose.component';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PasseportComponent } from './passeport/passeport.component';

import { VisaComponent } from './EspaceCitoyen/visa/visa.component';
import { PassDetailComponent } from './EspaceCitoyen/pass-detail/pass-detail.component';
import { AutreComponent } from './EspaceCitoyen/autre/autre.component';
import { ProblemComponent } from './EspaceCitoyen/problem/problem.component';
import { ToolbarCitoyenComponent } from './EspaceCitoyen/toolbar-citoyen/toolbar-citoyen.component';

import { AddPassComponent } from './EspaceGouvernement/add-pass/add-pass.component';



import { EnsemblePassComponent } from './EspaceDouanes/ensemble-pass/ensemble-pass.component';
import { GlobalToolbarInfo } from './globalToolbarInfo';

import { AffichagePassComponent } from './affichage-pass/affichage-pass.component';
import { PassInfosComponent } from './pass-infos/pass-infos.component';

import { AuthcitoyenComponent } from './Authentification/authcitoyen/authcitoyen.component';
import { AuthGouvComponent } from './Authentification/auth-gouv/auth-gouv.component';
import { AuthCustomComponent } from './Authentification/auth-custom/auth-custom.component';

import { PassService } from './Service/pass.service';
import { AuthentificationService } from './Service/authentification.service';

import { ChangeimgDirective } from './changeimg.directive';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PasseportComponent,
    VisaComponent,
    PassDetailComponent,
    AutreComponent,
    ProblemComponent,
    AccueilComponent,
    ChooseComponent,
    AddPassComponent,
    ChangeimgDirective,
    AuthcitoyenComponent,
    EnsemblePassComponent,
    ToolbarCitoyenComponent,
    AffichagePassComponent,
    PassInfosComponent,
    AuthGouvComponent,
    AuthCustomComponent
  ],
  imports: [
    HttpClientModule,
    StorageServiceModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PassService,
              GlobalToolbarInfo,
              AuthentificationService,
              AppComponent
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
