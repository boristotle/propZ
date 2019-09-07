import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data-service';
import { Lease } from '../../leases/leases.model';
import { PlacesService } from '../../places.service';
import { Tenant } from '../tenants.model';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-edit-tenant',
  templateUrl: './edit-tenant.page.html',
  styleUrls: ['./edit-tenant.page.scss'],
})
export class EditTenantPage implements OnInit {
  form: FormGroup;
  tenant: Tenant;
  leases: Lease[] = [];
  selectedLease: Lease;

  constructor(
    private dataService: DataService,
    public tenantService: TenantsService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    ) { }

    ngOnInit() {
        this.dataService.getLeases().subscribe((res: Lease[]) => {
            this.leases = res;
            console.log('this.leases', this.leases);
        });

        this.route.paramMap.subscribe(paramMap => {
            if (!paramMap.has('tenantId')) {
            this.navCtrl.navigateBack('/places/tabs/tenants');
            return;
            }
            this.tenantService.getTenant(+paramMap.get('tenantId')).subscribe(tenant => {
            this.tenant = tenant;

            this.form = new FormGroup({
                name: new FormControl(this.tenant.name, {
                updateOn: 'blur',
                validators: [Validators.required]
                }),
                LeaseId: new FormControl(this.tenant.LeaseId, {
                updateOn: 'blur',
                validators: []
                }),
                phone: new FormControl(this.tenant.phone, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
                }),
                email: new FormControl(this.tenant.email, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.min(1)]
                }),
                SSN: new FormControl(this.tenant.SSN, {
                updateOn: 'change',
                validators: [Validators.required]
                }),
                DOB: new FormControl(this.tenant.DOB, {
                updateOn: 'change',
                validators: [Validators.required]
                }),
                DL: new FormControl(this.tenant.DL, {
                updateOn: 'change',
                validators: [Validators.required]
                })
            });
            });
        });
    }

    get selectedLeaseText() {
        if (this.leases && this.tenant) {
          const lease = this.leases.find(l => l.id === this.tenant.LeaseId);
          if (lease) {
            return lease.Property.address;
        }
      }
    }

    selectLease(event) {
        this.tenant.LeaseId = event.detail.value;
    }

    get tenantId() {
        if (this.tenant) {
          return this.tenant.id;
        }
      }

    onEditTenant() {
      if (!this.form.valid) {
        return;
      }

      this.loadingCtrl.create({
        message: 'Edit tenant...'
      })
      .then(loadingEl => {
        loadingEl.present();
        const tenant = { ...this.form.value, id: this.tenantId };

        this.dataService
          .updateTenant(tenant)
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/places/tabs/tenants']);
          });
      });
    }

}
