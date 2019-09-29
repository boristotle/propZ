import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ActionSheetController, Platform } from '@ionic/angular';
import { Property } from '../../property.model';
import { DataService } from 'src/app/services/data-service';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';
// import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-new-lease',
  templateUrl: './new-lease.page.html',
  styleUrls: ['./new-lease.page.scss'],
})
export class NewLeasePage implements OnInit, OnDestroy {
  form: FormGroup;
  properties: Property[] = [];
  leaseDocument;
  error;
  uploadedFile;
  awaitingFileAttachment = false; // NOT IMPLEMENTED, use this to wait for file chooser to resolve

  constructor(
    private transfer: FileTransfer,
    // private file: File,
    private chooser: Chooser,
    private dataService: DataService,
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    protected cameraPreview: CameraPreview,
    private loadingCtrl: LoadingController,
    ) {
      // super(cameraPreview);
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

      const fileTransfer = this.transfer.create();
      const options: FileUploadOptions = {
        fileKey: 'leaseDoc',
        chunkedMode: true,
        fileName: this.leaseDocument.name,
        mimeType: this.leaseDocument.mediaType,
        params: lease
      };

      fileTransfer.upload(this.leaseDocument.dataURI, encodeURI('http://10.0.2.2:3000/api/leases'), options)
        .then((data) => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/leases']);
          console.log('data', data);
          // success
        }, (err) => {
          loadingEl.dismiss();
          console.log('err, failed to save lease', err);
          // error
        });

      // this.dataService
      //   .createLease(lease)
      //   .subscribe(() => {
      //     loadingEl.dismiss();
      //     this.form.reset();
      //     this.router.navigate(['/places/tabs/leases']);
      //   });
    });

  }

  selectFile() {
    this.awaitingFileAttachment = true;
    this.chooser.getFile()
      .then((err) => {
        this.error = err;
        console.log('err', err);
      }, (file) => {
        this.awaitingFileAttachment = false;
        this.leaseDocument = file;
      });
  }

  startCamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      // width: this.canvasW,
      // height: this.canvasH,
      camera: 'front',
      // tapPhoto: true, // this allows the camera to automatically take the photo when focused (no need for a take picture button);
      previewDrag: true,
      toBack: true
    };

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
       setTimeout(() => {
        this.takePhoto();
       }, 2000);
      },
      (err) => {
        if (err !== 'Camera already started!') {
          console.log('Camera start error: ', err);
        }
      });
  }

  stopCamera() {
    this.cameraPreview.stopCamera();
  }

  takePhoto() {
    console.log('TakePhotoTriggered!');
    // this.cameraPreview.setFocusMode(this.cameraPreview.FOCUS_MODE.CONTINUOUS_PICTURE);
    // this.cameraPreview.setFlashMode(this.cameraPreview.FLASH_MODE.ON);
    this.cameraPreview.takePicture({ quality: 90 }).then(base64PictureData => {
      const fileTransfer = this.transfer.create();

      const options: FileUploadOptions = {
        fileKey: 'leaseDoc',
        chunkedMode: true
      };

      fileTransfer.upload(`data:image/jpeg;base64,${base64PictureData}`, encodeURI('http://10.0.2.2:3000/api/leases'), options)
        .then((data) => {
          this.stopCamera();
          console.log('data', data);
          // success
        }, (err) => {
          this.stopCamera();
          console.log('err', err);
          // error
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
            // this.openBookingModal('select');
            this.startCamera();
          }
        },
        {
          text: 'Attach File/Photo',
          handler: () => {
            // this.upload();
            // this.openBookingModal('random');
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


  ngOnDestroy() {
    this.cameraPreview.stopCamera().then(
      (res) => {
        console.log('Camera stopped.', res);
      },
      (err) => {
        console.log('Camera stooped with error: ', err);
      });
  }
}
