import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-new-tenant',
  templateUrl: './new-tenant.page.html',
  styleUrls: ['./new-tenant.page.scss'],
})
export class NewTenantPage implements OnInit {
  form: FormGroup;

  constructor(
    private dataService: DataService,
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
      const tenant = { ...this.form.value };
      tenant.DOB = new Date(tenant.DOB).toLocaleDateString();

      this.dataService
        .createTenant(tenant)
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/tenants']);
        });
    });
  }

}
