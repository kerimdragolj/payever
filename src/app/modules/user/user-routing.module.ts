import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './components/user/user.component';
import { UsersListComponent } from './components/users-list/users-list.component';

import { UsersResolver } from './resolvers/users.resolver';
import { PaginationResolver } from '../core/resolvers/pagination.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      users: UsersResolver,
      paginationInfo: PaginationResolver
    },
    runGuardsAndResolvers: 'pathParamsOrQueryParamsChange',
    component: UsersListComponent
  },
  {
    path: ':id',
    component: UserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
