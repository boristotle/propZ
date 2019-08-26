import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Property } from '../../property.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.page.html',
  styleUrls: ['./edit-property.page.scss'],
})
export class EditPropertyPage implements OnInit, OnDestroy {
  place: Property;
  form: FormGroup;
  private placeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
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
      this.placeSub = this.placesService.getPlace(+paramMap.get('propertyId')).subscribe(place => {
        this.place = place;
        // this.form = new FormGroup({
        //   title: new FormControl(this.place.title, {
        //     updateOn: 'blur',
        //     validators: [Validators.required]
        //   }),
        //   description: new FormControl(this.place.description, {
        //     updateOn: 'blur',
        //     validators: [Validators.required, Validators.maxLength(180)]
        //   }),
        // });
      });

    });
  }

  get placeId() {
    if (this.place) {
      return this.place.id;
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
      this.placesService.updatePlace(
      this.place.id,
      this.form.value.propertyAddress,
      new Date(this.form.value.purchaseDate),
      this.form.value.purchasePrice,
      this.form.value.imageUrl,
      this.form.value.mortgage,
      this.form.value.insurance,
      this.form.value.taxes
      ).subscribe(() => {
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
