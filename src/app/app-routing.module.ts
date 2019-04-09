import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AccueilComponent } from './accueil/accueil.component';
import { ChooseComponent } from './choose/choose.component';

import { AuthcitoyenComponent } from './Authentification/authcitoyen/authcitoyen.component';
import { AuthGouvComponent } from './Authentification/auth-gouv/auth-gouv.component';
import { AuthCustomComponent } from './Authentification/auth-custom/auth-custom.component';
import { PasseportComponent } from './EspaceCitoyen/passeport/passeport.component';

import { PassDetailComponent } from './EspaceCitoyen/pass-detail/pass-detail.component';
import { VisaComponent } from './EspaceCitoyen/visa/visa.component';
import { AutreComponent } from './EspaceCitoyen/autre/autre.component';
import { ProblemComponent } from './EspaceCitoyen/problem/problem.component';

import { AddPassComponent } from './EspaceGouvernement/add-pass/add-pass.component';
import { EnsemblePassComponent } from './EspaceDouanes/ensemble-pass/ensemble-pass.component';
import { AccueilGouvComponent } from './EspaceGouvernement/accueil-gouv/accueil-gouv.component';
import { ModifyPassComponent } from './EspaceGouvernement/modify-pass/modify-pass.component';
import { PassIssuesComponent } from './EspaceGouvernement/pass-issues/pass-issues.component';

import { AffichagePassComponent } from './EspaceDouanes/affichage-pass/affichage-pass.component';
import { PassInfosComponent } from './EspaceDouanes/pass-infos/pass-infos.component';
import { PassListComponent } from './EspaceGouvernement/pass-list/pass-list.component';
import { PassViewComponent } from './EspaceGouvernement/pass-view/pass-view.component';
import { PassDetailsComponent } from './EspaceGouvernement/pass-details/pass-details.component';
import { AddVisaComponent } from './EspaceGouvernement/add-visa/add-visa.component';


const routes: Routes = [
  { path: '', redirectTo: '/Accueil', pathMatch: 'full' },

  
  //Visitor
  { path: 'Accueil', component: AccueilComponent },
  { path: 'Se connecter', component: ChooseComponent },

  // Authentification 
  { path: 'Citoyen',component: AuthcitoyenComponent},
  { path: 'Gouvernement',component: AuthGouvComponent},
  { path: 'Douanes',component: AuthCustomComponent},

  // Gouv
  { path: 'Espace Gouvernement', component: AccueilGouvComponent },
  { path: 'Espace Gouvernement/Modifier Passeport', component: ModifyPassComponent },
  { path: 'Espace Gouvernement/Liste des Passeports', component: PassListComponent },
  { path: 'Espace Gouvernement/Ajout Passeport', component: AddPassComponent },
  { path: 'Espace Gouvernement/Gestion des Problèmes', component: PassIssuesComponent },
  { path: 'Espace Gouvernement/Passeports/:passNb', component: PassViewComponent, 
  children : [
      { path: '', redirectTo: 'Passeport', pathMatch: 'full' },
      {path: 'Passeport', component: PassDetailsComponent},
      {path: 'Visa', component: VisaComponent}, 
      {path: 'Autre', component: AutreComponent },
      {path: 'problem', component: ProblemComponent},
      {path: 'Ajout VISA', component: AddVisaComponent}
  ]
},

  //Citizen
  { path: 'Espace Citoyen', component: PasseportComponent, 
        children : [
            { path: '', redirectTo: 'Mon Passeport', pathMatch: 'full' },
            {path: 'Mon Passeport', component: PassDetailComponent},
            {path: 'Visa', component: VisaComponent}, 
            {path: 'Autre', component: AutreComponent },
            {path: 'problem', component: ProblemComponent},
        ]
  },

  // Custom
  { path: 'Espace Douanes/Liste des Passeports',component: EnsemblePassComponent},
  { path: 'Espace Douanes/Passeports/:passNb', component: AffichagePassComponent, 
  children : [
      { path: '', redirectTo: 'Passeport', pathMatch: 'full' },
      {path: 'Passeport', component: PassInfosComponent},
      {path: 'Visa', component: VisaComponent}, 
      {path: 'Autre', component: AutreComponent },
      {path: 'problem', component: ProblemComponent},
  ]
}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
