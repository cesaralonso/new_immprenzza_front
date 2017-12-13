import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {UsersComponent } from './users.component';
import {UsersTableComponent } from './components/users-table/users-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'users-table', component: UsersTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
