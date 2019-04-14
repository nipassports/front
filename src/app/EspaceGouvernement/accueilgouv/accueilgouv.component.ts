import { Component, OnInit, Inject } from '@angular/core';
import { GlobalToolbarInfo } from '../../globalToolbarInfo';
import { PassService } from '../../Service/pass.service';
import { Router } from '@angular/router';
import { SESSION_STORAGE,WebStorageService } from 'angular-webstorage-service';
import {ViewService} from '../../Service/view.service';

@Component({
  selector: 'app-accueilgouv',
  templateUrl: './accueilgouv.component.html',
  styleUrls: ['./accueilgouv.component.css']
})
export class AccueilgouvComponent implements OnInit {

  constructor(private global: GlobalToolbarInfo, private service: PassService,
    private router: Router, @Inject(SESSION_STORAGE) private storage: WebStorageService,private viewService: ViewService) { }

  ngOnInit() {
    this.viewService.setView('Espace Gouvernement');
    console.log("autority storage :"+this.storage.get("autority"));
    if ( this.storage.get("autority") !== null ){
      this.global.autority = this.storage.get("autority");
     }
     else{
      this.global.autority = 0;
     }
     console.log("autority globale :"+this.global.autority);
  }


  viewstorage(view:string){
    this.viewService.setView(view);
    this.storage.set("view",view);
  }

  autorisation(value:number){
    console.log("autority :"+value);
    this.storage.set("autority",value);
    location.reload();
  }

}
