import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AccueilComponent } from './accueil/accueil.component';
import { PageNonTrouveeComponent } from './page-non-trouvee/page-non-trouvee.component';

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
import { AccueilgouvComponent } from "./EspaceGouvernement/accueilgouv/accueilgouv.component";

import { AffichagePassComponent } from './EspaceDouanes/affichage-pass/affichage-pass.component';
import { PassInfosComponent } from './EspaceDouanes/pass-infos/pass-infos.component';
import { PassListComponent } from './EspaceGouvernement/pass-list/pass-list.component';
import { PassViewComponent } from './EspaceGouvernement/pass-view/pass-view.component';
import { PassDetailsComponent } from './EspaceGouvernement/pass-details/pass-details.component';
import { AddVisaComponent } from './EspaceGouvernement/add-visa/add-visa.component';
import { VisaDouaneComponent } from './EspaceDouanes/visa-douane/visa-douane.component';
import { FAQComponent } from './faq/faq.component';
import { VisagouvComponent } from './EspaceGouvernement/visagouv/visagouv.component'
import { AuthentifComponent } from './authentif/authentif.component';
import { AuthGuard } from './Service/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: '/Accueil', pathMatch: 'full' },
  { path: 'not-found', component: PageNonTrouveeComponent },

  //Visitor
  { path: 'Accueil', component: AccueilComponent },
  { path: 'Se connecter', component: AuthentifComponent },
  { path: 'FAQ', component: FAQComponent },

  // Gouv
  { path: 'Espace Gouvernement', canActivate: [AuthGuard], component: AccueilgouvComponent },
  { path: 'Espace Gouvernement/Modifier Passeport', canActivate: [AuthGuard], component: ModifyPassComponent },
  { path: 'Espace Gouvernement/Liste des Passeports', canActivate: [AuthGuard], component: PassListComponent },
  { path: 'Espace Gouvernement/Ajout Passeport', canActivate: [AuthGuard], component: AddPassComponent },
  { path: 'Espace Gouvernement/Gestion des Problèmes', canActivate: [AuthGuard], component: PassIssuesComponent },
  {
    path: 'Espace Gouvernement/Passeports/:passNb', component: PassViewComponent,
    children: [
      { path: '', redirectTo: 'Passeport', pathMatch: 'full' },
      { path: 'Passeport', canActivate: [AuthGuard], component: PassDetailsComponent },
      { path: 'Visa', canActivate: [AuthGuard], component: VisagouvComponent },
      { path: 'Autre', canActivate: [AuthGuard], component: AutreComponent },
      { path: 'problem', canActivate: [AuthGuard], component: ProblemComponent },
      { path: 'Ajout VISA', canActivate: [AuthGuard], component: AddVisaComponent }
    ]
  },

  //Citizen
  {
    path: 'Espace Citoyen', component: PasseportComponent,
    children: [
      { path: '', redirectTo: 'Mon Passeport', pathMatch: 'full' },
      { path: 'Mon Passeport', canActivate: [AuthGuard], component: PassDetailComponent },
      { path: 'Visa', canActivate: [AuthGuard], component: VisaComponent },
      { path: 'Autre', canActivate: [AuthGuard], component: AutreComponent },
      { path: 'problem', canActivate: [AuthGuard], component: ProblemComponent },
    ]
  },

  // Custom
  { path: 'Espace Douanes/Liste des Passeports', component: EnsemblePassComponent },
  {
    path: 'Espace Douanes/Passeports/:passNb', component: AffichagePassComponent,
    children: [
      { path: '', redirectTo: 'Passeport', pathMatch: 'full' },
      { path: 'Passeport', canActivate: [AuthGuard], component: PassInfosComponent },
      { path: 'Visa', canActivate: [AuthGuard], component: VisaDouaneComponent },
      { path: 'Autre', canActivate: [AuthGuard], component: AutreComponent },
      { path: 'problem', canActivate: [AuthGuard], component: ProblemComponent },
    ]
  },
  { path: '**', redirectTo: 'not-found'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
