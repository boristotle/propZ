import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Property } from '../../property.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data-service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.page.html',
  styleUrls: ['./edit-property.page.scss'],
})
export class EditPropertyPage implements OnInit, OnDestroy {
  property: Property;
  form: FormGroup;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private router: Router,
    private loadCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('propertyId')) {
        this.navCtrl.navigateBack('/places/tabs/properties');
        return;
      }
      this.placeSub = this.placesService.getPlace(+paramMap.get('propertyId')).subscribe(property => {
        this.property = property;

        this.form = new FormGroup({
          address: new FormControl(this.property.address, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          // description: new FormControl(this.property.description, {
          //   updateOn: 'blur',
          //   validators: [Validators.required, Validators.maxLength(180)]
          // }),
          purchasePrice: new FormControl(this.property.purchasePrice, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.min(1)]
          }),
          homeValue: new FormControl(this.property.homeValue, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          purchaseDate: new FormControl(this.property.purchaseDate, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          mortgage: new FormControl(this.property.mortgage, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          taxes: new FormControl(this.property.taxes, {
            updateOn: 'change',
            validators: [Validators.required]
          }),
          insurance: new FormControl(this.property.insurance, {
            updateOn: 'change',
            validators: [Validators.required]
          })
        });
      });

    });
  }

  get propertyId() {
    if (this.property) {
      return this.property.id;
    }
  }

  onUpdateProperty() {
    if (!this.form.valid) {
      return;
    }
    this.loadCtrl.create({
       message: 'Updating property...'
    }).then(loadingEl => {
      loadingEl.present();
      const property = { ...this.form.value, id: this.propertyId };

      this.dataService
        .updateProperty(property).subscribe(() => {
        loadingEl.dismiss();
        this.form.reset();
        this.router.navigate(['/places/tabs/properties']);
      });
    });

  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

}
