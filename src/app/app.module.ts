import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
// import { NgxMaskModule, IConfig } from 'ngx-mask';
// import { JwPaginationComponent } from 'jw-angular-pagination';/////1
import {NgxPaginationModule} from 'ngx-pagination';


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
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './login/login.component';

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
    AdminComponent,
    GamesComponent,
    GamesDetailsComponent,
    DeviceDetailsComponent,
    LoginComponent,
    // JwPaginationComponent//////1

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule
    // NgxMaskModule.forRoot(),
    // ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
