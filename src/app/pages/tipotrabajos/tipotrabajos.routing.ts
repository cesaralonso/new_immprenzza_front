import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {TipotrabajosComponent } from './tipotrabajos.component';
import {TipotrabajosTableComponent } from './components/tipotrabajos-table/tipotrabajos-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: TipotrabajosComponent,
    children: [
      { path: 'tipotrabajos-table', component: TipotrabajosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
