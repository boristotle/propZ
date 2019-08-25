import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PlacesPage } from './places.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: PlacesPage,
        children: [
            {
                path: 'discover', children: [
                    {
                       path: '',
                       loadChildren: './notifications/notifications.module#NotificationsPageModule'
                    },
                    {
                        path: ':placeId',
                        loadChildren: './notifications/notification-details/notification-details.module#NotificationDetailsPageModule'
                    },
                    {
                        path: '',
                        redirectTo: '/places/tabs/discover',
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'offers', children: [
                    {
                        path: '',
                        loadChildren: './offers/offers.module#OffersPageModule'
                    },
                    {
                        path: 'new',
                        loadChildren: './offers/new-offer/new-offer.module#NewOfferPageModule'
                    },
                    {
                        path: 'edit/:placeId',
                        loadChildren: './offers/edit-offer/edit-offer.module#EditOfferPageModule'
                    },
                    {
                        path: ':placeId',
                        loadChildren: './offers/place-bookings/place-bookings.module#PlaceBookingsPageModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/places/tabs/discover',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlacesRoutingModule {

}