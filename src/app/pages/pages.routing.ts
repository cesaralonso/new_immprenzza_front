import { Routes, RouterModule, CanActivate } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../shared/auth-guard.service';
export const routes: Routes = [
{
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
},
{
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
},
{
    path: 'forgot',
    loadChildren: 'app/pages/forgot/forgot.module#ForgotModule'
},
{
    path: 'change-password',
    loadChildren: 'app/pages/change-password/change-password.module#ChangePasswordModule', 
    canActivate: [AuthGuard]
},
{
    path: 'pages',
    component: Pages,
    children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivateChild: [AuthGuard] },
    { path: 'abonos', loadChildren: './abonos/abonos.module#AbonosModule',
        canActivateChild: [AuthGuard] },
    { path: 'alertas', loadChildren: './alertas/alertas.module#AlertasModule',
        canActivateChild: [AuthGuard] },
    { path: 'checkouts', loadChildren: './checkouts/checkouts.module#CheckoutsModule',
        canActivateChild: [AuthGuard] },
    { path: 'clientes', loadChildren: './clientes/clientes.module#ClientesModule',
        canActivateChild: [AuthGuard] },
    { path: 'conceptos', loadChildren: './conceptos/conceptos.module#ConceptosModule',
        canActivateChild: [AuthGuard] },
    { path: 'egresoconceptos', loadChildren: './egresoconceptos/egresoconceptos.module#EgresoconceptosModule',
        canActivateChild: [AuthGuard] },
    { path: 'modulos', loadChildren: './modulos/modulos.module#ModulosModule',
        canActivateChild: [AuthGuard] },
    { path: 'ordens', loadChildren: './ordens/ordens.module#OrdensModule',
        canActivateChild: [AuthGuard] },
    { path: 'permisos', loadChildren: './permisos/permisos.module#PermisosModule',
        canActivateChild: [AuthGuard] },
    { path: 'personas', loadChildren: './personas/personas.module#PersonasModule',
        canActivateChild: [AuthGuard] },
    { path: 'personals', loadChildren: './personals/personals.module#PersonalsModule',
        canActivateChild: [AuthGuard] },
    { path: 'puestos', loadChildren: './puestos/puestos.module#PuestosModule',
        canActivateChild: [AuthGuard] },
    { path: 'rols', loadChildren: './rols/rols.module#RolsModule',
        canActivateChild: [AuthGuard] },
    { path: 'tipoalertas', loadChildren: './tipoalertas/tipoalertas.module#TipoalertasModule',
        canActivateChild: [AuthGuard] },
    { path: 'tipotrabajos', loadChildren: './tipotrabajos/tipotrabajos.module#TipotrabajosModule',
        canActivateChild: [AuthGuard] },
    { path: 'trabajos', loadChildren: './trabajos/trabajos.module#TrabajosModule',
        canActivateChild: [AuthGuard] },
    { path: 'users', loadChildren: './users/users.module#UsersModule',
        canActivateChild: [AuthGuard] },
    { path: 'si_modulos', loadChildren: './si_modulos/si_modulos.module#Si_modulosModule',
        canActivateChild: [AuthGuard] },
    { path: 'si_permisos', loadChildren: './si_permisos/si_permisos.module#Si_permisosModule',
        canActivateChild: [AuthGuard] },
    { path: 'si_rols', loadChildren: './si_rols/si_rols.module#Si_rolsModule',
        canActivateChild: [AuthGuard] },
    { path: 'si_users', loadChildren: './si_users/si_users.module#Si_usersModule',
        canActivateChild: [AuthGuard] },
    ]
}
];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
