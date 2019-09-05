import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Expense } from '../expenses.model';
import { DataService } from 'src/app/services/data-service';
import { Property } from '../../property.model';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.page.html',
  styleUrls: ['./expense-details.page.scss'],
})
export class ExpenseDetailsPage implements OnInit {
  expense: Expense;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private dataService: DataService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('expenseId')) {
        this.navCtrl.navigateBack('/places/tabs/expenses');
        return;
      }

      const expenseId = +paramMap.get('expenseId');
      // this.expense$ = this.dataService.getExpense(expenseId);
      this.dataService.getExpense(expenseId).subscribe((res: Expense) => {
        this.expense = res;
      }, err => {
        console.log('err', err);
      });
    });

  }
  // get expenseId() {
  //   if (this.expense) {
  //     return this.expense.id;
  //   }
  // }

}
