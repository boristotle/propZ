import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Property } from '../../property.model';
import { PlacesService } from '../../places.service';
import { DataService } from 'src/app/services/data-service';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
// import { File } from '@ionic-native/file/ngx';
// import { FilePath } from '@ionic-native/file-path/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';

@Component({
  selector: 'app-new-lease',
  templateUrl: './new-lease.page.html',
  styleUrls: ['./new-lease.page.scss'],
})
export class NewLeasePage implements OnInit {
  form: FormGroup;
  properties: Property[] = [];
  leaseFilePath;
  leaseFile;

  constructor(
    private transfer: FileTransfer,
    // private file: File,
    private chooser: Chooser,
    // private filePath: FilePath,
    private dataService: DataService,
    private placesService: PlacesService,
    private router: Router,
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

  // getImageDetails(event) {
  //   console.log('file', event.target.children[0].files);
  //   this.leaseFile = event.target.children[0].files;
  //   console.log('event.detail.value', event.detail.value); // this is the file path
  //   this.leaseFilePath = event.detail.value;
  //   console.log('this.uploadcalled');
  //   this.upload();
  // }

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
    this.chooser.getFile()
      .then((file) => {

        const fileTransfer = this.transfer.create();
        const options: FileUploadOptions = {
          fileKey: 'leaseDoc',
          chunkedMode: true,
          fileName: file.name,
          mimeType: file.mediaType
        };

        fileTransfer.upload(file.dataURI, 'http://10.0.2.2:3000/api/leases', options)
          .then((data) => {
            console.log('data', data);
            // success
          }, (err) => {
            console.log('err', err);
            // error
          });
      })
      .catch((err: any) => console.log('err', err));

    // this.fileChooser.open()
    //   .then((uri) => {
    //     console.log('uri', uri);
    //     this.filePath.resolveNativePath(uri)
    //       .then((nativePath) => {
    //         this.fileTransfer = this.transfer.create();

    //         const options: FileUploadOptions = {
    //           fileKey: 'leaseDoc',
    //           chunkedMode: true,
    //           fileName: this.leaseFile[0].name
    //        };

    //         this.fileTransfer.upload(this.leaseFilePath, encodeURI('http://10.0.2.2:3000/api/leases'), options)
    //           .then((data) => {
    //             console.log('data', data);
    //             // success
    //           }, (err) => {
    //             console.log('err', err);
    //             // error
    //           });

    //       });
      // });




    // const that = this;
    // function encodeImageFileAsURL() {
    //   const file = that.leaseFile[0];
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     console.log('RESULT', reader.result);
    //   };
    //   return reader.readAsDataURL(file);
    // }

    // console.log('upload', this);
    // console.log('this.leaseFilePath', this.leaseFilePath);
    // console.log('base64', encodeImageFileAsURL());

  }

}
