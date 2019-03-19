import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassDetailComponent } from './pass-detail/pass-detail.component';
import { VisaComponent } from './visa/visa.component';
import { AutreComponent } from './autre/autre.component';
import { ProblemComponent } from './problem/problem.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PasseportComponent } from './passeport/passeport.component';
import { ChooseComponent } from './choose/choose.component';
import { AddPassComponent } from './add-pass/add-pass.component';
import { AuthcitoyenComponent } from './authcitoyen/authcitoyen.component';
import { EnsemblePassComponent } from './ensemble-pass/ensemble-pass.component';
import { AffichagePassComponent } from './affichage-pass/affichage-pass.component';
import { PassInfosComponent } from './pass-infos/pass-infos.component';
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
  { path: 'Liste des Passeports',component: EnsemblePassComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
