import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LeasesService } from '../leases.service';
import { Property } from '../../property.model';
import { PlacesService } from '../../places.service';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-new-lease',
  templateUrl: './new-lease.page.html',
  styleUrls: ['./new-lease.page.scss'],
})
export class NewLeasePage implements OnInit {
  form: FormGroup;
  properties: Property[] = [];

  constructor(
    private dataService: DataService,
    private placesService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController,
    ) { }

  ngOnInit() {
    this.dataService.getProperties().subscribe((res: Property[]) => {
      this.properties = res;
    }, err => {
      console.log('err', err);
    });

    this.form = new FormGroup({
      PropertyId: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      leaseStart: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      leaseEnd: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      rentDue: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      lateDaysAllowed: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      dailyLateFee: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      deposit: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      rentAmountDue: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  onCreateLease() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Creating lease...'
    })
    .then(loadingEl => {
      loadingEl.present();
      const lease = { ...this.form.value };

      this.dataService
        .createLease(lease)
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/leases']);
        });
    });

  }

}
