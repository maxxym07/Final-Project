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
import { AdminComponent } from './pages/admin/admin.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'game-consoles',component:GameConsolesComponent},
  {path:'gadgets',component:GadgetsComponent},
  {path:'ps-plus',component:PsPlusComponent},
  {path:'basket',component:BasketComponent},
  {path:'games',component:GamesComponent},
  {path:'games-details',component:GamesDetailsComponent},
  {path:'device-details',component:DeviceDetailsComponent},
  {path:'login',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
