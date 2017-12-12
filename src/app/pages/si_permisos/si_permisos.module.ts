import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './si_permisos.routing';
import { Si_permisosComponent } from './si_permisos.component';
import { Si_permisosAddModalComponent } from './components/si_permisos-table/si_permisos-add-modal/si_permisos-add-modal.component';
import { Si_permisosEditModalComponent } from './components/si_permisos-table/si_permisos-edit-modal/si_permisos-edit-modal.component';
import { Si_permisosService } from './components/si_permisos-table/si_permisos.service';
import { Si_permisosTableComponent } from './components/si_permisos-table/si_permisos-table.component';
import { Si_permisosFilterPipe } from './components/si_permisos-table/si_permisos-filter.pipe';
@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    ReactiveFormsModule,
    NgaModule,
    NgbRatingModule,
    routing,
    DataTableModule,
    NgbModalModule,
    BootstrapModalModule.forRoot({ container: document.body })  
  ],
  declarations: [
    Si_permisosComponent,
    Si_permisosTableComponent,
    Si_permisosFilterPipe,
    Si_permisosAddModalComponent,
    Si_permisosEditModalComponent,
  ],
  entryComponents: [
    Si_permisosAddModalComponent,
    Si_permisosEditModalComponent,
  ],
  providers: [
    Si_permisosService,
  ]
})
export class Si_permisosModule {
}
