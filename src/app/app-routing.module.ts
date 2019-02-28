import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PassDetailComponent } from './pass-detail/pass-detail.component';
import { VisaComponent } from './visa/visa.component';
import { AutreComponent } from './autre/autre.component';
import { ProblemComponent } from './problem/problem.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PasseportComponent } from './passeport/passeport.component';
import { ChooseComponent } from './choose/choose.component';


const routes: Routes = [
  { path: '', redirectTo: '/Accueil', pathMatch: 'full' },
  {path: 'MonPasseport', component: PasseportComponent, 
        children : [
            { path: '', redirectTo: 'Mon Passeport', pathMatch: 'full' },
            {path: 'Mon Passeport', component: PassDetailComponent},
            {path: 'Visa', component: VisaComponent}, 
            {path: 'Autre', component: AutreComponent },
            {path: 'problem', component: ProblemComponent},
        ]
  },

  { path: 'Accueil', component: AccueilComponent },
  { path: 'choose', component: ChooseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
