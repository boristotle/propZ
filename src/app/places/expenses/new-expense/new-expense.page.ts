import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ActionSheetController } from '@ionic/angular';
import { DataService } from 'src/app/services/data-service';
import { Property } from '../../property.model';
import { Observable } from 'rxjs';
import { Chooser } from '@ionic-native/chooser/ngx';
import { FileTransfer, FileUploadOptions } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.page.html',
  styleUrls: ['./new-expense.page.scss'],
})
export class NewExpensePage implements OnInit {
  form: FormGroup;
  properties$: Observable<Property[] | {}>;
  expenseCategories = ['utility', 'service', 'materials', 'mortgage', 'insurance', 'taxes', 'lawncare', 'poolcare', 'other'];
  expenseFile;
  awaitingFileAttachment = false; // NOT IMPLEMENTED, use this to wait for file chooser to resolve

  constructor(
    private dataService: DataService,
    private router: Router,
    private transfer: FileTransfer,
    private chooser: Chooser,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    ) { }

  ngOnInit() {
    this.properties$ = this.dataService.getProperties();

    this.form = new FormGroup({
      PropertyId: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      date: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required, Validators.min(1)]
      }),
      amount: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      note: new FormControl(null, {
        updateOn: 'change',
        validators: []
      }),
      category: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
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
        this.expenseFile = file;
      });
  }

  onCreateExpense() {
    console.log('this.form', this.form);
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Creating expense...'
    })
    .then(loadingEl => {
      loadingEl.present();
      const expense = { ...this.form.value };

      const fileTransfer = this.transfer.create();
      const options: FileUploadOptions = {
        fileKey: 'expenseDoc',
        chunkedMode: true,
        fileName: this.expenseFile.name,
        mimeType: this.expenseFile.mediaType,
        params: expense
      };

      fileTransfer.upload(this.expenseFile.dataURI,
        encodeURI('http://10.0.2.2:3000/api/expenses'),
        options
      )
        .then((data) => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/expenses']);
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

}
