import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Tenant } from './tenants.model';
import { TenantsService } from './tenants.service';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.page.html',
  styleUrls: ['./tenants.page.scss'],
})
export class TenantsPage implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }
  tenants: Tenant[] = [];

  ngOnInit() {
    this.dataService.getTenants().subscribe((res: Tenant[]) => {
      this.tenants = res;
    }, err => {
      console.log('err', err);
    });
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'tenants', 'edit', offerId]);
  }

}
