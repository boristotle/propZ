import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PlacesPage } from './places.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: PlacesPage,
        children: [
            {
                path: 'notifications', children: [
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
                        redirectTo: '/places/tabs/notifications',
                        pathMatch: 'full'
                    }
                ]
            },
            {
                path: 'properties', children: [
                    {
                        path: '',
                        loadChildren: './properties/properties.module#PropertiesPageModule'
                    },
                    // {
                    //     path: 'leases/:leaseId',
                    //     loadChildren: './properties/properties.module#PropertiesPageModule'
                    // },
                    {
                        path: 'new',
                        loadChildren: './properties/new-offer/new-offer.module#NewPropertyPageModule'
                    },
                    {
                        path: 'edit/:propertyId',
                        loadChildren: './properties/edit-offer/edit-offer.module#EditPropertyPageModule'
                    },
                    {
                        path: ':propertyId',
                        loadChildren: './properties/property-details/property-details.module#PropertyDetailsPageModule'
                    }
                ]
            },
            {
                path: 'leases', children: [
                    {
                        path: '',
                        loadChildren: './leases/leases.module#LeasesPageModule'
                    },
                    {
                        path: ':leaseId',
                        loadChildren: './leases/leases.module#LeasesDetailsPageModule'
                    },
                    // {
                    //     path: 'new',
                    //     loadChildren: './properties/new-offer/new-offer.module#NewPropertyPageModule'
                    // },
                    // {
                    //     path: 'edit/:propertyId',
                    //     loadChildren: './properties/edit-offer/edit-offer.module#EditPropertyPageModule'
                    // },
                    // {
                    //     path: ':propertyId',
                    //     loadChildren: './properties/property-details/property-details.module#PropertyDetailsPageModule'
                    // }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: '/places/tabs/notifications',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlacesRoutingModule {

}