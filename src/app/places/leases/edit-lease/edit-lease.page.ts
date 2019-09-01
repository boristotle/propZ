import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { LeasesService } from '../leases.service';
import { Subscription, Observable } from 'rxjs';
import { Lease } from '../leases.model';
import { Property } from '../../property.model';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-edit-lease',
  templateUrl: './edit-lease.page.html',
  styleUrls: ['./edit-lease.page.scss'],
})
export class EditLeasePage implements OnInit, OnDestroy {
  form: FormGroup;
  lease: Lease;
  properties$: Observable<Property[] | {}>;
  private leasesSub: Subscription;

  constructor(
    private leasesService: LeasesService,
    private dataService: DataService,
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

          this.properties$ = this.dataService.getProperties();

          this.leasesSub = this.leasesService.getLease(+paramMap.get('leaseId')).subscribe(lease => {
            this.lease = lease;
            this.form = new FormGroup({
                PropertyId: new FormControl(this.lease.PropertyId, {
                  updateOn: 'blur',
                  validators: [Validators.required]
                }),
                leaseStart: new FormControl(new Date(this.lease.leaseStart), {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                leaseEnd: new FormControl(new Date(this.lease.leaseEnd), {
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

  onEditLease() {
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
        this.form.value.PropertyId,
        this.form.value.leaseStart,
        this.form.value.leaseEnd,
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
