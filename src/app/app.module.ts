import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';


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
    AddPassComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    ),
    NgbModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
