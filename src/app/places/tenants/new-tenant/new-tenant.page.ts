import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-new-tenant',
  templateUrl: './new-tenant.page.html',
  styleUrls: ['./new-tenant.page.scss'],
})
export class NewTenantPage implements OnInit {
  form: FormGroup;

  constructor(
    private tenantsService: TenantsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      phone: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      email: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      SSN: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      DOB: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      DL: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  onCreateTenant() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Creating tenant...'
    })
    .then(loadingEl => {
      loadingEl.present();
      this.tenantsService
        .addTenant(
          this.form.value.name,
          this.form.value.phone,
          this.form.value.email,
          this.form.value.SSN,
          new Date(this.form.value.DOB),
          this.form.value.DL,
        )
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/tenants']);
        });
    });

  }

}
