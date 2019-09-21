import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-service';
import { Property } from '../property.model';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.page.html',
  styleUrls: ['./properties.page.scss'],
})
export class PropertiesPage implements OnInit {

  constructor(private dataService: DataService, private router: Router) { }
  properties: Property[] = [];
  filteredProperties: Property[] = [];

  ngOnInit() {
    this.dataService.getProperties().subscribe((res: Property[]) => {
      this.properties = res;
      this.filteredProperties = [...res];
    }, err => {
      console.log('err', err);
    });
  }

  get totalMonthlyIncome() {
    if (this.filteredProperties) {
      return this.filteredProperties.reduce((acc, prop) => {
        return acc + (prop.Leases[0] ? prop.Leases[0].rentAmountDue : 0);
      }, 0);
    }
    return 0;
  }

  get totalMonthlyExpenses() {
    if (this.filteredProperties) {
      return this.filteredProperties.reduce((acc, prop) => {
        return acc + ((prop.mortgage + prop.insurance + prop.taxes) / 12);
      }, 0);
    }
    return 0;
  }

  get totalEquity() {
    if (this.filteredProperties) {
      return this.filteredProperties.reduce((acc, prop) => {
        return acc + (prop.homeValue - prop.purchasePrice);
      }, 0);
    }
    return 0;
  }

  get totalMortgageDebt() {
    if (this.filteredProperties) {
      return this.filteredProperties.reduce((acc, prop) => {
        return acc + prop.mortgageDebt;
      }, 0);
    }
    return 0;
  }

  filterProperties(event) {
    this.filteredProperties = this.properties.filter(p => p.address.includes(event.detail.value));
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'properties', 'edit', offerId]);
  }

}
