import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { HomeComponent } from './home/home.component';
import { MoreUsersComponent } from './more-users/more-users.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'list',
    component: UserListComponent
  },
  {
    path: 'add',
    component: AddUsersComponent
  },
  {
    path: 'edit/:id',
    component: AddUsersComponent
  },
  {
    path: 'more-users',
    component: MoreUsersComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
