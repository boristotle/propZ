import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription, Observable } from 'rxjs';
import { Expense } from '../expenses.model';
import { LeasesService } from '../../leases/leases.service';
import { DataService } from 'src/app/services/data-service';
import { filter, take, first } from 'rxjs/operators';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.page.html',
  styleUrls: ['./expense-details.page.scss'],
})
export class ExpenseDetailsPage implements OnInit {
  expense$: Observable<Expense[] | {}>;
  private leaseSub: Subscription;

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
      console.log('expenseId', expenseId);
      // this.expense$ = this.dataService.getExpense(expenseId);
      this.expense$ = this.dataService.getExpense(expenseId);
    });
  }

  // get expenseId() {
  //   if (this.expense) {
  //     return this.expense.id;
  //   }
  // }

  // ngOnDestroy() {
  //   if (this.leaseSub) {
  //     this.leaseSub.unsubscribe();
  //   }
  // }

}
