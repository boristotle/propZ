import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlacesService } from 'src/app/places/places.service';
import { DataService } from 'src/app/services/data-service';
import { Property } from '../../property.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.page.html',
  styleUrls: ['./new-expense.page.scss'],
})
export class NewExpensePage implements OnInit {
  form: FormGroup;
  properties$: Observable<Property[] | {}>;
  expenseCategories = ['utility', 'service', 'materials', 'mortgage', 'insurance', 'taxes', 'lawncare', 'poolcare', 'other'];

  constructor(
    private placesService: PlacesService,
    private dataService: DataService,
    private router: Router,
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
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      amount: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      category: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
  }

  onCreateExpense() {
    if (!this.form.valid) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Creating expense...'
    })
    .then(loadingEl => {
      loadingEl.present();
      const expense = { ...this.form.value };

      this.dataService
        .createExpense(expense)
        .subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/expenses']);
        });
    });

  }

}
