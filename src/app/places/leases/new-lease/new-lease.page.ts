import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Property } from '../../property.model';
import { PlacesService } from '../../places.service';
import { DataService } from 'src/app/services/data-service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';


@Component({
  selector: 'app-new-lease',
  templateUrl: './new-lease.page.html',
  styleUrls: ['./new-lease.page.scss'],
})
export class NewLeasePage implements OnInit {
  form: FormGroup;
  properties: Property[] = [];
  fileTransfer;

  constructor(
    private transfer: FileTransfer,
    private file: File,
    private dataService: DataService,
    private placesService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController,
    ) {
      this.fileTransfer = this.transfer.create();
    }

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
      rentDueDay: new FormControl(null, {
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

  getImageDetails(event) {
    console.log('event', event);
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

  upload() {
    const options: FileUploadOptions = {
       fileKey: 'file',
       fileName: 'name.jpg',
       headers: {}
    };

    this.fileTransfer.upload('<file path>', '<api endpoint>', options)
     .then((data) => {
       // success
     }, (err) => {
       // error
     });
  }

}
