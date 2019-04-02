import { Component, OnInit, Inject } from '@angular/core';
import { GlobalToolbarInfo } from '../../globalToolbarInfo';
import { PassService } from '../../Service/pass.service';
import { Router } from '@angular/router';
import { SESSION_STORAGE,WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-accueil-gouv',
  templateUrl: './accueil-gouv.component.html',
  styleUrls: ['./accueil-gouv.component.css']
})
export class AccueilGouvComponent implements OnInit {


  constructor(private global: GlobalToolbarInfo, private service: PassService,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    console.log("autority storage :"+this.storage.get("autority"));
    if ( this.storage.get("autority") !== null ){
      this.global.autority = this.storage.get("autority");
     }
     else{
      this.global.autority = 0;
     }
     console.log("autority globale :"+this.global.autority);
  }

  private entier = 0;

  mouseEnter(int: number) {
    this.entier = int;
  }

  mouseLeave(int: number) {
    this.entier = int

  }

  autorisation(value:number){
    console.log("autority :"+value);
    this.storage.set("autority",value);
    location.reload();
  }
}
