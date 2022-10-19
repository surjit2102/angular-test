import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoreUsersComponent } from './more-users/more-users.component';

@NgModule({
  declarations: [
    UserListComponent,
    HomeComponent,
    AddUsersComponent,
    MoreUsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PagesRoutingModule,
    MaterialModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule
  ]
})
export class PagesModule { }
