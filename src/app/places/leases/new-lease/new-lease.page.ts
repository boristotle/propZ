import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { LeasesService } from '../leases.service';
import { Property } from '../../property.model';
import { PlacesService } from '../../places.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-lease',
  templateUrl: './new-lease.page.html',
  styleUrls: ['./new-lease.page.scss'],
})
export class NewLeasePage implements OnInit {
  form: FormGroup;
  properties$: Observable<Property[] | {}>;

  constructor(
    private leasesService: LeasesService,
    private placesService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController,
    ) { }

  ngOnInit() {
    this.properties$ = this.placesService.places;

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
      lateDays: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      lateFee: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      deposit: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      rentAmount: new FormControl(null, {
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
      this.leasesService
        .addLease(
        this.form.value.leaseStart,
        this.form.value.leaseEnd,
        this.form.value.deposit,
        this.form.value.rentAmount,
        this.form.value.rentDue,
        this.form.value.lateFee,
        this.form.value.lateDays,
        this.form.value.PropertyId,

        )
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/leases']);
      });
    });

  }

}
