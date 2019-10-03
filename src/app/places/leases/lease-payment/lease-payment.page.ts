import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chooser } from '@ionic-native/chooser/ngx';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Lease } from '../leases.model';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-lease-payment',
  templateUrl: './lease-payment.page.html',
  styleUrls: ['./lease-payment.page.scss']
})
export class LeasePaymentPage implements OnInit, OnDestroy {
  form: FormGroup;
  lease: Lease;
  leasePaymentFile;
  awaitingFileAttachment = false; // NOT IMPLEMENTED, use this to wait for file chooser to resolve

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private transfer: FileTransfer,
    private chooser: Chooser,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
        date: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        }),
        amount: new FormControl(null, {
          updateOn: 'change',
          validators: [Validators.required]
        })
    });

    this.route.paramMap.subscribe(paramMap => {
        const leaseId = +(paramMap.get('leaseId'));
        this.dataService.getLeases().subscribe((results: Lease[]) => {
            this.lease = results.find(l => l.id === leaseId);
            console.log('this.lease', this.lease);
        });
    });
  }

  selectDocumentOrPhoto() {
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Take Photo',
          handler: () => {
            // TODO:  add ability to upload photo
            // this.startCamera();
          }
        },
        {
          text: 'Attach File/Photo',
          handler: () => {
            this.selectFile();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  selectFile() {
    this.awaitingFileAttachment = true;
    this.chooser.getFile()
      .then((err) => {
        // this.error = err;
        console.log('err', err);
      }, (file) => {
        this.awaitingFileAttachment = false;
        this.leasePaymentFile = file;
      });
  }

  onCreateLeasePayment() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Creating leasePayment...'
    })
    .then(loadingEl => {
      loadingEl.present();
      const leasePayment = { ...this.form.value };

      const fileTransfer = this.transfer.create();
      const options: FileUploadOptions = {
        fileKey: 'leasePaymentDoc',
        chunkedMode: true,
        fileName: this.leasePaymentFile.name,
        mimeType: this.leasePaymentFile.mediaType,
        params: leasePayment
      };

      fileTransfer.upload(this.leasePaymentFile.dataURI,
        encodeURI(`http://10.0.2.2:3000/api/leases/${this.lease.LeasePayments[0].id}/payment`),
        options
      )
        .then((data) => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/leases']);
          console.log('data', data);
          // success
        }, (err) => {
          console.log('err', err);
          // error
        });

      // this.dataService
      //   .createExpense(expense)
      //   .subscribe(() => {
      //     loadingEl.dismiss();
      //     this.form.reset();
      //     this.router.navigate(['/places/tabs/expenses']);
      //   });
    });

  }

  ngOnDestroy() {
    // if (this.leaseSub) {
    //   this.leaseSub.unsubscribe();
    // }
  }

}
