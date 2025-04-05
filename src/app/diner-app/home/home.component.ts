import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandingConfiguration, Restaurant, TableScan } from 'src/app/_models/app.models';
import { ApiService } from 'src/app/_services/api.service';
import { SessionStorageService } from 'src/app/_services/storage/session-storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  branding_configs!:BrandingConfiguration;
  restaurant?:Restaurant;
  url=environment.apiUrl;
  table!:TableScan
  constructor(private sessionStorage:SessionStorageService) {

    
  }
  ngAfterViewInit(){
    this.sessionStorage.StorageValue.subscribe(x=>{
    this.restaurant=this.sessionStorage.getItem<Restaurant>('restaurant') as any;
    this.table=this.sessionStorage.getItem<TableScan>('Table') as any;
    this.branding_configs=this.restaurant?.branding_configuration as any;
    })

  }
  
getOrder(id:any){
  
}
  
}
