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
  expenses: Expense[] = [];
  filteredExpenses;
  properties: Property[] = [];
  expenseCategories = ['utility', 'service', 'materials', 'mortgage', 'insurance', 'taxes', 'lawncare', 'poolcare', 'other'];
  propertyId;
  category;

  ngOnInit() {
    this.dataService.getExpenses().subscribe((res: Expense[]) => {
      this.expenses = res;
      this.filteredExpenses = [...res];
     }, err => {
       console.log('err', err);
     });


    this.dataService.getProperties().subscribe((res: Property[]) => {
      this.properties = res;
    }, err => {
      console.log('err', err);
    });
  }

  get totalExpenses() {
    if (this.filteredExpenses) {
      return this.filteredExpenses.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount;
      }, 0);
    }
    return 0;
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'expenses', 'edit', offerId]);
  }


  filterExpenses() {
    if (this.propertyId && this.category) {
      this.filteredExpenses = this.expenses.filter(e => e.PropertyId === this.propertyId && e.category === this.category);
    } else if (this.propertyId && !this.category) {
        this.filteredExpenses = this.expenses.filter(e => e.PropertyId === this.propertyId);
    } else if (this.category && !this.propertyId) {
        this.filteredExpenses = this.expenses.filter(e => e.category === this.category);
    } else {
        this.filteredExpenses = this.expenses;
    }
  }

}
