import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { Tenant } from './tenants.model';
import { TenantsService } from './tenants.service';

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.page.html',
  styleUrls: ['./tenants.page.scss'],
})
export class TenantsPage implements OnInit, OnDestroy {

  constructor(private tenantsService: TenantsService, private router: Router) { }
  tenants$: Observable<Tenant[]>;

  ngOnInit() {
    this.tenants$ = this.tenantsService.tenants;
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'tenants', 'edit', offerId]);
    console.log('Editing item', offerId);
  }

  ngOnDestroy() {

  }
}
