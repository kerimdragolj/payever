import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, MatTableModule } from '@angular/material';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { UsersListComponent } from './components/users-list/users-list.component';

import { UsersResolver } from './resolvers/users.resolver';
import { PaginationResolver } from '../core/resolvers/pagination.resolver';

@NgModule({
  declarations: [
    UserComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    UsersResolver,
    PaginationResolver
  ]
})
export class UserModule { }
