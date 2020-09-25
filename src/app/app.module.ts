import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
// import { NgxMaskModule, IConfig } from 'ngx-mask';
import { OrderModule } from 'ngx-order-pipe';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BasketComponent } from './pages/basket/basket.component';
import { GameConsolesComponent } from './pages/game-consoles/game-consoles.component';
import { GadgetsComponent } from './pages/gadgets/gadgets.component';
import { PsPlusComponent } from './pages/ps-plus/ps-plus.component';
import { GamesComponent } from './pages/games/games.component';
import { GamesDetailsComponent } from './pages/games-details/games-details.component';
import { DeviceDetailsComponent } from './pages/device-details/device-details.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { UnderCategoriesComponent } from './admin/under-categories/under-categories.component';
import { AdminCouponComponent } from './admin/admin-coupon/admin-coupon.component';
import { CategorySearchPipe } from './shared/pipes/category-search.pipe';
import { ProductSearchPipe } from './shared/pipes/product-search.pipe';
import { SubcategorySearchPipe } from './shared/pipes/subcategory-search.pipe';
import { OrderSearchPipe } from './shared/pipes/order-search.pipe';

// import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
// import { loaderConfig } from './preloader-config';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BasketComponent,
    GameConsolesComponent,
    GadgetsComponent,
    PsPlusComponent,
    GamesComponent,
    GamesDetailsComponent,
    DeviceDetailsComponent,
    LoginComponent,
    ProfileComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    UnderCategoriesComponent,
    AdminCouponComponent,
    CategorySearchPipe,
    ProductSearchPipe,
    SubcategorySearchPipe,
    OrderSearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    // NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    OrderModule,
    // NgxUiLoaderModule.forRoot(loaderConfig),
    // NgxUiLoaderRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
