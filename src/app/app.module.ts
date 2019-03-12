import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';


import { AppRoutingModule } from './app-routing.module';
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
    EnsemblePassComponent
  ],
  imports: [
    HttpClientModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [PassService,
              AppComponent
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
