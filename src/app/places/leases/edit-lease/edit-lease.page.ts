import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { LeasesService } from '../leases.service';
import { Subscription } from 'rxjs';
import { Lease } from '../leases.model';

@Component({
  selector: 'app-edit-lease',
  templateUrl: './edit-lease.page.html',
  styleUrls: ['./edit-lease.page.scss'],
})
export class EditLeasePage implements OnInit, OnDestroy {
  form: FormGroup;
  lease: Lease;
  private leasesSub: Subscription;

  constructor(
    private leasesService: LeasesService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private navCtrl: NavController
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
          if (!paramMap.has('leaseId')) {
            this.navCtrl.navigateBack('/places/tabs/leases');
            return;
          }
          this.leasesSub = this.leasesService.getLease(+paramMap.get('leaseId')).subscribe(lease => {
            this.lease = lease;
            this.form = new FormGroup({
                propertyAddress: new FormControl(this.lease.propertyAddress, {
                  updateOn: 'blur',
                  validators: [Validators.required]
                }),
                leaseStart: new FormControl(this.lease.leaseStart, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                leaseEnd: new FormControl(this.lease.leaseEnd, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                rentDue: new FormControl(this.lease.rentDue, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                lateDays: new FormControl(this.lease.lateDays, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                lateFee: new FormControl(this.lease.lateFee, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                deposit: new FormControl(this.lease.deposit, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                rentAmount: new FormControl(this.lease.rentAmount, {
                  updateOn: 'change',
                  validators: [Validators.required]
                })
              });
          });
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
        this.form.value.propertyAddress,
        new Date(this.form.value.leaseStart),
        new Date(this.form.value.leaseEnd),
        this.form.value.deposit,
        this.form.value.rentAmount,
        this.form.value.rentDue,
        this.form.value.lateFee,
        this.form.value.lateDays
        )
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/leases']);
      });
    });

  }

  ngOnDestroy() {
    if (this.leasesSub) {
      this.leasesSub.unsubscribe();
    }
  }

}
