import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service';
// import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
//   styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit, OnInit, OnDestroy {

  constructor(
    // private transfer: FileTransfer,
    protected cameraPreview: CameraPreview
    ) { }

  ngOnInit() {}

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
    //   const fileTransfer = this.transfer.create();

    //   const options: FileUploadOptions = {
    //     fileKey: 'leaseDoc',
    //     chunkedMode: true
    //   };

    //   fileTransfer.upload(`data:image/jpeg;base64,${base64PictureData}`, encodeURI('http://10.0.2.2:3000/api/leases'), options)
    //     .then((data) => {
    //       this.stopCamera();
    //       console.log('data', data);
    //       // success
    //     }, (err) => {
    //       this.stopCamera();
    //       console.log('err', err);
    //       // error
    //     });
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
