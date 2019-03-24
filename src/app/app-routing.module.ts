import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AccueilComponent } from './accueil/accueil.component';
import { PasseportComponent } from './passeport/passeport.component';
import { ChooseComponent } from './choose/choose.component';

import { AffichagePassComponent } from './affichage-pass/affichage-pass.component';
import { PassInfosComponent } from './pass-infos/pass-infos.component';
import { AuthcitoyenComponent } from './Authentification/authcitoyen/authcitoyen.component';
import { AuthGouvComponent } from './Authentification/auth-gouv/auth-gouv.component';
import { AuthCustomComponent } from './Authentification/auth-custom/auth-custom.component';
import { PassDetailComponent } from './EspaceCitoyen/pass-detail/pass-detail.component';
import { VisaComponent } from './EspaceCitoyen/visa/visa.component';
import { AutreComponent } from './EspaceCitoyen/autre/autre.component';
import { ProblemComponent } from './EspaceCitoyen/problem/problem.component';
import { AddPassComponent } from './EspaceGouvernement/add-pass/add-pass.component';
import { EnsemblePassComponent } from './EspaceDouanes/ensemble-pass/ensemble-pass.component';

const routes: Routes = [
  { path: '', redirectTo: '/Accueil', pathMatch: 'full' },
  {path: 'Mon Passeport', component: PasseportComponent, 
        children : [
            { path: '', redirectTo: 'Mon Passeport', pathMatch: 'full' },
            {path: 'Mon Passeport', component: PassDetailComponent},
            {path: 'Visa', component: VisaComponent}, 
            {path: 'Autre', component: AutreComponent },
            {path: 'problem', component: ProblemComponent},
        ]
  },
  
  {path: 'Passeports/:passNb', component: AffichagePassComponent, 
  children : [
      { path: '', redirectTo: 'Passeport', pathMatch: 'full' },
      {path: 'Passeport', component: PassInfosComponent},
      {path: 'Visa', component: VisaComponent}, 
      {path: 'Autre', component: AutreComponent },
      {path: 'problem', component: ProblemComponent},
  ]
},
  { path: 'Ajout Passeport', component: AddPassComponent },
  { path: 'Accueil', component: AccueilComponent },
  { path: 'Se connecter', component: ChooseComponent },
  { path: 'Citoyen',component: AuthcitoyenComponent},
  { path: 'Gouvernement',component: AuthGouvComponent},
  { path: 'Douanes',component: AuthCustomComponent},
  { path: 'Liste des Passeports',component: EnsemblePassComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
