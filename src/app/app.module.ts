import { AbonosService } from './pages/abonos/components/abonos-table/abonos.service';
import { AlertasService } from './pages/alertas/components/alertas-table/alertas.service';
import { CheckoutsService } from './pages/checkouts/components/checkouts-table/checkouts.service';
import { ClientesService } from './pages/clientes/components/clientes-table/clientes.service';
import { ConceptosService } from './pages/conceptos/components/conceptos-table/conceptos.service';
import { EgresoconceptosService } from './pages/egresoconceptos/components/egresoconceptos-table/egresoconceptos.service';
import { ModulosService } from './pages/modulos/components/modulos-table/modulos.service';
import { OrdensService } from './pages/ordens/components/ordens-table/ordens.service';
import { PermisosService } from './pages/permisos/components/permisos-table/permisos.service';
import { PersonasService } from './pages/personas/components/personas-table/personas.service';
import { PersonalsService } from './pages/personals/components/personals-table/personals.service';
import { PuestosService } from './pages/puestos/components/puestos-table/puestos.service';
import { RolsService } from './pages/rols/components/rols-table/rols.service';
import { TipoalertasService } from './pages/tipoalertas/components/tipoalertas-table/tipoalertas.service';
import { TipotrabajosService } from './pages/tipotrabajos/components/tipotrabajos-table/tipotrabajos.service';
import { TrabajosService } from './pages/trabajos/components/trabajos-table/trabajos.service';
import { UsersService } from './pages/users/components/users-table/users.service';
import { Si_modulosService } from './pages/si_modulos/components/si_modulos-table/si_modulos.service';
import { Si_permisosService } from './pages/si_permisos/components/si_permisos-table/si_permisos.service';
import { Si_rolsService } from './pages/si_rols/components/si_rols-table/si_rols.service';
import { Si_usersService } from './pages/si_users/components/si_users-table/si_users.service';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './shared/auth-localstorage.service';
import { AuthService } from './shared/auth.service';
import { AuthGuard } from './shared/auth-guard.service';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

/*
* Platform and Environment providers/directives/pipes
*/
import { routing } from './app.routing';
// Configuración
import { Configuration } from './app.constants';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { LocalStorageModule } from 'angular-2-local-storage';

// Application wide providers
const APP_PROVIDERS = [
AppState,
GlobalState,
Configuration,
];

export type StoreType = {
state: InternalStateType,
restoreInputValues: () => void,
disposeOldHosts: () => void,
};

/**
* `AppModule` is the main entry point into Angular2's bootstraping process
*/
@NgModule({
bootstrap: [App],
declarations: [
    App,
],
imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,
    LocalStorageModule.withConfig({
        prefix: 'nuevoimmprenzza_5a318213731ff',
        storageType: 'localStorage',
    }),
    BootstrapModalModule.forRoot({ container: document.body }),
],
entryComponents: [
],
providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    AuthGuard,
    AuthService,
    AuthLocalstorage,
    AbonosService,
    AlertasService,
    CheckoutsService,
    ClientesService,
    ConceptosService,
    EgresoconceptosService,
    ModulosService,
    OrdensService,
    PermisosService,
    PersonasService,
    PersonalsService,
    PuestosService,
    RolsService,
    TipoalertasService,
    TipotrabajosService,
    TrabajosService,
    UsersService,
    Si_modulosService,
    Si_permisosService,
    Si_rolsService,
    Si_usersService,
]
})

export class AppModule {

constructor(public appState: AppState) {
}
}
