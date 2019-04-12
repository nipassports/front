import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthentificationService } from './authentification.service';
import { Injectable, Inject } from '@angular/core';
import { WebStorageService, SESSION_STORAGE } from 'angular-webstorage-service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authentificationService: AuthentificationService,
              private router: Router,
              @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.storage.get('token') != null) {
      return true;
    } else {
      this.router.navigate(['/Se connecter']);
    }
  }
}