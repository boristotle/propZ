import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Tenant } from '../tenants.model';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.page.html',
  styleUrls: ['./tenant-details.page.scss'],
})
export class TenantDetailsPage implements OnInit {
  tenant$: Observable<Tenant>;

  constructor(
      private route: ActivatedRoute,
      private navCtrl: NavController,
      private tenantService: TenantsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('tenantId')) {
        this.navCtrl.navigateBack('/places/tabs/tenants');
        return;
      }
      this.tenant$ = this.tenantService.getTenant(+paramMap.get('tenantId'));
    });
  }

}
