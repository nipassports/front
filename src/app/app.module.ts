import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule }    from '@angular/forms';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PasseportComponent } from './passeport/passeport.component';
import { VisaComponent } from './visa/visa.component';
import { PassDetailComponent } from './pass-detail/pass-detail.component';
import { AutreComponent } from './autre/autre.component';
import { ProblemComponent } from './problem/problem.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ChooseComponent } from './choose/choose.component';
import { AddPassComponent } from './add-pass/add-pass.component';
import { PassService } from './pass.service';
import { ChangeimgDirective } from './changeimg.directive';
import { AuthcitoyenComponent } from './authcitoyen/authcitoyen.component';
import { EnsemblePassComponent } from './ensemble-pass/ensemble-pass.component';
import { GlobalToolbarInfo } from './globalToolbarInfo';
import { ToolbarCitoyenComponent } from './toolbar-citoyen/toolbar-citoyen.component';
import { AuthentificationService } from './authentification.service';
import { AuthInfo } from './authInfo';
import { AffichagePassComponent } from './affichage-pass/affichage-pass.component';
import { PassInfosComponent } from './pass-infos/pass-infos.component';



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
    PassInfosComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PassService,
              GlobalToolbarInfo,
              AuthInfo,
              AuthentificationService,
              AppComponent
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
