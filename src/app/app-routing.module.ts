import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'census-map',
    loadChildren: './census-map/census-map.module#CensusMapPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'login',
    component: UserProfileComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    CommonModule,
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
  declarations: [UserProfileComponent]
})
export class AppRoutingModule {}
