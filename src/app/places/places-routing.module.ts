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
                        path: ':propertyId',
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
                    {
                        path: 'new',
                        loadChildren: './properties/new-property/new-property.module#NewPropertyPageModule'
                    },
                    // {
                    //     path: 'edit/:propertyId',
                    //     loadChildren: './properties/edit-property/edit-property.module#EditPropertyPageModule'
                    // },
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
                        path: 'new',
                        loadChildren: './leases/new-lease/new-lease.module#NewLeasePageModule'
                    },
                    // {
                    //     path: 'edit/:propertyId',
                    //     loadChildren: './leases/edit-lease/edit-lease.module#EditLeasePageModule'
                    // },
                    {
                        path: ':leaseId',
                        loadChildren: './leases/lease-details/lease-details.module#LeaseDetailsPageModule'
                    }
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