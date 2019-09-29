import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { LeasesService } from '../leases.service';
import { Subscription, Observable } from 'rxjs';
import { Lease } from '../leases.model';
import { Property } from '../../property.model';
import { DataService } from 'src/app/services/data-service';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-edit-lease',
  templateUrl: './edit-lease.page.html',
  styleUrls: ['./edit-lease.page.scss'],
})
export class EditLeasePage implements OnInit, OnDestroy {
  form: FormGroup;
  lease: Lease;
  properties$: Observable<Property[] | {}>;
  downloadedFile;
  error;
  private leasesSub: Subscription;

  constructor(
    private transfer: FileTransfer,
    private file: File,
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
                leaseStart: new FormControl(this.lease.leaseStart, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                leaseEnd: new FormControl(this.lease.leaseEnd, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                rentDueDay: new FormControl(this.lease.rentDueDay, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                lateDaysAllowed: new FormControl(this.lease.lateDaysAllowed, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                dailyLateFee: new FormControl(this.lease.dailyLateFee, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                deposit: new FormControl(this.lease.deposit, {
                  updateOn: 'change',
                  validators: [Validators.required]
                }),
                rentAmountDue: new FormControl(this.lease.rentAmountDue, {
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
        this.form.value.rentAmountDue,
        this.form.value.rentDueDay,
        this.form.value.dailyLateFee,
        this.form.value.lateDaysAllowed
        )
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/leases']);
      });
    });
  }

  viewLeaseDocument() {
    const fileTransfer = this.transfer.create();

    fileTransfer.download(
      encodeURI(`http://10.0.2.2:3000/api/images/2/original`),
      this.file.externalDataDirectory,
      // this.file.externalRootDirectory + '/Download/file.jpg',
      true,
      )
      .then((file) => {
        this.downloadedFile = file;
        console.log('success');
      }, err => {
        this.error = err;
        console.log('err', err);
      });

  }

  ngOnDestroy() {
    if (this.leasesSub) {
      this.leasesSub.unsubscribe();
    }
  }

}
