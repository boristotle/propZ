import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlacesService } from 'src/app/places/places.service';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.page.html',
  styleUrls: ['./new-property.page.scss'],
})
export class NewPropertyPage implements OnInit {
  form: FormGroup;

  constructor(
    private placesService: PlacesService,
    private dataService: DataService,
    private router: Router,
    private loadingCtrl: LoadingController,
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      address: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      // description: new FormControl(null, {
      //   updateOn: 'blur',
      //   validators: [Validators.required, Validators.maxLength(180)]
      // }),
      purchasePrice: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      homeValue: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      mortgageDebt: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      purchaseDate: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      mortgage: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      taxes: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      insurance: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  onCreateProperty() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Creating property...'
    })
    .then(loadingEl => {
      loadingEl.present();
      const property = { ...this.form.value };

      this.dataService
        .createProperty(property)
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/properties']);
        });
    });

  }

}
