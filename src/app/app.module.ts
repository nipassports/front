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
import { PasseportComponent } from './EspaceCitoyen/passeport/passeport.component';

import { VisaComponent } from './EspaceCitoyen/visa/visa.component';
import { PassDetailComponent } from './EspaceCitoyen/pass-detail/pass-detail.component';
import { AutreComponent } from './EspaceCitoyen/autre/autre.component';
import { ProblemComponent } from './EspaceCitoyen/problem/problem.component';
import { ToolbarCitoyenComponent } from './EspaceCitoyen/toolbar-citoyen/toolbar-citoyen.component';

import { AddPassComponent } from './EspaceGouvernement/add-pass/add-pass.component';
import { ToolbarGouvComponent } from './EspaceGouvernement/toolbar-gouv/toolbar-gouv.component';
import { AccueilGouvComponent } from './EspaceGouvernement/accueil-gouv/accueil-gouv.component';

import { ToolbarDouaneComponent } from './EspaceDouanes/toolbar-douane/toolbar-douane.component';


import { EnsemblePassComponent } from './EspaceDouanes/ensemble-pass/ensemble-pass.component';
import { GlobalToolbarInfo } from './globalToolbarInfo';

import { AffichagePassComponent } from './EspaceDouanes/affichage-pass/affichage-pass.component';
import { PassInfosComponent } from './EspaceDouanes/pass-infos/pass-infos.component';

import { AuthcitoyenComponent } from './Authentification/authcitoyen/authcitoyen.component';
import { AuthGouvComponent } from './Authentification/auth-gouv/auth-gouv.component';
import { AuthCustomComponent } from './Authentification/auth-custom/auth-custom.component';

import { PassService } from './Service/pass.service';
import { AuthentificationService } from './Service/authentification.service';

import { ChangeimgDirective } from './changeimg.directive';
import { ModifyPassComponent } from './EspaceGouvernement/modify-pass/modify-pass.component';
import { PassListComponent } from './EspaceGouvernement/pass-list/pass-list.component';
import { PassIssuesComponent } from './EspaceGouvernement/pass-issues/pass-issues.component';
import { PassDetailsComponent } from './EspaceGouvernement/pass-details/pass-details.component';
import { PassViewComponent } from './EspaceGouvernement/pass-view/pass-view.component';
import { AddVisaComponent } from './EspaceGouvernement/add-visa/add-visa.component';
import { VisaDouaneComponent } from './EspaceDouanes/visa-douane/visa-douane.component';
import { FAQComponent } from './faq/faq.component';
import { VisagouvComponent } from './EspaceGouvernement/visagouv/visagouv.component';
import { AuthentifComponent } from './authentif/authentif.component';
import { PageNonTrouveeComponent } from './page-non-trouvee/page-non-trouvee.component';
import { View } from './view';
import { ViewService } from './Service/view.service';




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
    AuthCustomComponent,
    ToolbarGouvComponent,
    ToolbarDouaneComponent,
    AccueilGouvComponent,
    ModifyPassComponent,
    PassListComponent,
    PassIssuesComponent,
    PassDetailsComponent,
    PassViewComponent,
    AddVisaComponent,
    VisaDouaneComponent,
    FAQComponent,
    VisagouvComponent,
    AuthentifComponent,
    PageNonTrouveeComponent,

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
              ViewService,
              GlobalToolbarInfo,
              AuthentificationService,
              AppComponent,
              View
              
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
