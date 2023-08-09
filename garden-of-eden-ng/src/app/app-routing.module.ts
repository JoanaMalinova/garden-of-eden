import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './core/about/about.component';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CatalogComponent } from './catalog/catalog/catalog.component';
import { FavouritesComponent } from './store/favourites/favourites.component';
import { CartComponent } from './store/cart/cart.component';
import { DetailsComponent } from './catalog/details/details.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'login',
    // canActivate: [AuthGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    // canActivate: [AuthGuard],
    component: RegisterComponent
  },
  { path: 'catalog', component: CatalogComponent },
  {
    path: 'favourites',
    canActivate: [AuthGuard],
    component: FavouritesComponent
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    component: CartComponent
  },
  { path: ':plantId/details', component: DetailsComponent },
  { path: 'logout', redirectTo: 'home' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
