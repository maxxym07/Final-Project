import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { BasketComponent } from './pages/basket/basket.component';
import { BlogComponent } from './pages/blog/blog.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { GameConsolesComponent } from './pages/game-consoles/game-consoles.component';
import { GadgetsComponent } from './pages/gadgets/gadgets.component';
import { PsPlusComponent } from './pages/ps-plus/ps-plus.component';
import { AdminComponent } from './pages/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BasketComponent,
    BlogComponent,
    LoginComponent,
    AboutComponent,
    GameConsolesComponent,
    GadgetsComponent,
    PsPlusComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
