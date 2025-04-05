import { NgModule } from '@angular/core';
import {NgxCurrencyDirective} from 'ngx-currency'
import { ColorPickerModule } from 'ngx-color-picker';
import { DndListModule } from '@ryware/ngx-drag-and-drop-lists';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SettingsComponent } from './settings/settings.component';
import { MenuComponent } from './menu/menu.component';
import { CommonImageComponent } from '../_common/common-image/common-image.component';
import { DinifyCommonModule } from '../_common/dinify-common.module';
import { TablesComponent } from './tables/tables.component';
import { QRCodeModule } from 'angularx-qrcode';
import { RestProfileComponent } from './settings/rest-profile/rest-profile.component';
import { MenuDesignComponent } from './settings/menu-design/menu-design.component';
import { OrdersComponent } from './orders/orders.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import { AutoCompleteComponent } from "../_common/auto-complete/auto-complete.component";
import { MenuDinersComponent } from './menu-diners/menu-diners.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { PaymentsComponent } from './payments/payments.component';
import { DinerAppModule } from '../diner-app/diner-app.module';
import { MenuCommonComponent } from "../_common/menu-common/menu-common.component";
import { RestUsersComponent } from './settings/rest-users/rest-users.component';
import { CommonUsersComponent } from '../_common/common-users/common-users.component';
import { SupportComponent } from './support/support.component';
import { BillingComponent } from './settings/billing/billing.component';
import { RestNotificationsComponent } from './rest-notifications/rest-notifications.component';

const routes: Routes = [
  {path: "", redirectTo: "dashboard", pathMatch: "full"},
  {path:'dashboard',component:DashboardComponent,title:'Dashboard'},
  {path:'settings',component:SettingsComponent,title:'Settings',children:[
    {path: "", redirectTo: "rest-users", pathMatch: "full"},
    {path:'restaurant-profile',component:RestProfileComponent},
    {path:'menu-design',component:MenuDesignComponent},
    {path:'rest-users',component:RestUsersComponent,title:'Users'},
    {path:'billing',component:BillingComponent,title:'Billing'},
    {path:'billing/paid/:id',component:BillingComponent,title:'Billing'}
  ]},
  {path:'menu',component:MenuComponent,title:'Menu'},
  {path:'tables',component:TablesComponent,title:'Tables'},
  {path:'reviews',component:ReviewsComponent,title:'Reviews'},
  {path:'orders',component:OrdersComponent,title:'Orders'},
  {path:'payments',component:PaymentsComponent,title:'Payments'},
  {path:'reports',component:ReportsComponent,title:'Reports'}, 
  {path:'support',component:SupportComponent,title:'Support'},  
  {path:'reports/:type',component:ReportDetailComponent,title:'ReportDetail'},
  {path:'notifications',component:RestNotificationsComponent,title:'Notifications'},
  { path: '**', redirectTo: '' }
  ];

@NgModule({
  declarations: [
    DashboardComponent,
    SettingsComponent,
    MenuComponent,
    TablesComponent,
    RestProfileComponent,
    MenuDesignComponent,
    OrdersComponent,
    ReportsComponent,
    ReportDetailComponent,
    MenuDinersComponent,
    RestUsersComponent,
    ReviewsComponent,
    SupportComponent,
    BillingComponent,
    RestNotificationsComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    DinifyCommonModule,
    QRCodeModule,
    ColorPickerModule,
    DndListModule,
    NgxCurrencyDirective,
    DragDropModule
],
  exports:[
    RouterModule    
  ]
})
export class RestaurantMgtModule { }
