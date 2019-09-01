import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Expense } from './expenses.model';
import { DataService } from 'src/app/services/data-service';
import { Property } from '../property.model';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.page.html',
  styleUrls: ['./expenses.page.scss'],
})
export class ExpensesPage implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }

  expenses$: Observable<Expense[] | {}>;
  properties$: Observable<Property[] | {}>;
  expenseCategories = ['utility', 'service', 'materials', 'mortgage', 'insurance', 'taxes', 'lawncare', 'poolcare', 'other'];

  ngOnInit() {
    this.expenses$ = this.dataService.getExpenses();
    this.properties$ = this.dataService.getProperties();
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'expenses', 'edit', offerId]);
  }
}
