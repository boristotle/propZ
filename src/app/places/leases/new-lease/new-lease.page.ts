import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Property } from '../../property.model';
import { PlacesService } from '../../places.service';
import { DataService } from 'src/app/services/data-service';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';

@Component({
  selector: 'app-new-lease',
  templateUrl: './new-lease.page.html',
  styleUrls: ['./new-lease.page.scss'],
})
export class NewLeasePage implements OnInit, OnDestroy {
  form: FormGroup;
  properties: Property[] = [];

  constructor(
    private transfer: FileTransfer,
    private chooser: Chooser,
    private dataService: DataService,
    private placesService: PlacesService,
    private router: Router,
    private cameraPreview: CameraPreview,
    private loadingCtrl: LoadingController,
    ) {}

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

      this.dataService
        .createLease(lease)
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/leases']);
        });
    });

  }

  // upload() {
  //   this.chooser.getFile()
  //     .then((file) => {

  //       const fileTransfer = this.transfer.create();
  //       const options: FileUploadOptions = {
  //         fileKey: 'leaseDoc',
  //         chunkedMode: true,
  //         fileName: file.name,
  //         mimeType: file.mediaType
  //       };

  //       fileTransfer.upload(file.dataURI, 'http://10.0.2.2:3000/api/leases', options)
  //         .then((data) => {
  //           console.log('data', data);
  //           // success
  //         }, (err) => {
  //           console.log('err', err);
  //           // error
  //         });
  //     })
  //     .catch((err: any) => console.log('err', err));
  // }

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
          console.log('err', err);
          // error
        });
    });
      // this.base64Image = 'data:image/jpeg;base64,' + base64PictureData;
      // this.events.publish("cameraPhoto", this.base64Image, this.configlocId);
      // this.navCtrl.pop();
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
