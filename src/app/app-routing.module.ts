import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { GameConsolesComponent } from './pages/game-consoles/game-consoles.component';
import { GadgetsComponent } from './pages/gadgets/gadgets.component';
import { PsPlusComponent } from './pages/ps-plus/ps-plus.component';
import { BasketComponent } from './pages/basket/basket.component';
import { GamesComponent } from './pages/games/games.component';
import { GamesDetailsComponent } from './pages/games-details/games-details.component';
import { DeviceDetailsComponent } from './pages/device-details/device-details.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { UnderCategoriesComponent } from './admin/under-categories/under-categories.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminCouponComponent } from './admin/admin-coupon/admin-coupon.component';
import { ProfileGuard } from './shared/guards/profile.guard';
import { AuthGuard } from './shared/guards/auth.guard';



const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'game-consoles',component:GameConsolesComponent},
  {path:'gadgets',component:GadgetsComponent},
  {path:'ps-plus',component:PsPlusComponent},
  {path:'basket',component:BasketComponent},
  {path:'games',component:GamesComponent},
  {path:'games/:subcategory/:name',component:GamesDetailsComponent},
  {path:'device-details/:subcategory/:name',component:DeviceDetailsComponent},
  {path:'login',component:LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard] },
  
  {path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'category', pathMatch: 'full' },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'subcategory', component: UnderCategoriesComponent },
      { path: 'coupon', component: AdminCouponComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'orders', component: AdminOrdersComponent },
  ] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// canActivate:[AuthGuard],