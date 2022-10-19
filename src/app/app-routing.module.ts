import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './pages/add-users/add-users.component';
import { HomeComponent } from './pages/home/home.component';
import { UserListComponent } from './pages/user-list/user-list.component';
// import { MainComponent } from './page-layout/main/main.component';
import { AuthGaurd } from './shared/service/auth.gaurd.guard';
const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  //   canActivate: [AuthGaurd],
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  //     },
  //   ]
  // },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  // {
  //   path: 'list',
  //   component: UserListComponent,
  //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  // },
  // {
  //   path: 'add',
  //   component: AddUsersComponent,
  //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  // }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
