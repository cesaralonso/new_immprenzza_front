import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {PersonalsComponent } from './personals.component';
import {PersonalsTableComponent } from './components/personals-table/personals-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: PersonalsComponent,
    children: [
      { path: 'personals-table', component: PersonalsTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
