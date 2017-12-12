import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './si_modulos.routing';
import { Si_modulosComponent } from './si_modulos.component';
import { Si_modulosAddModalComponent } from './components/si_modulos-table/si_modulos-add-modal/si_modulos-add-modal.component';
import { Si_modulosEditModalComponent } from './components/si_modulos-table/si_modulos-edit-modal/si_modulos-edit-modal.component';
import { Si_modulosService } from './components/si_modulos-table/si_modulos.service';
import { Si_modulosTableComponent } from './components/si_modulos-table/si_modulos-table.component';
import { Si_modulosFilterPipe } from './components/si_modulos-table/si_modulos-filter.pipe';
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
    Si_modulosComponent,
    Si_modulosTableComponent,
    Si_modulosFilterPipe,
    Si_modulosAddModalComponent,
    Si_modulosEditModalComponent,
  ],
  entryComponents: [
    Si_modulosAddModalComponent,
    Si_modulosEditModalComponent,
  ],
  providers: [
    Si_modulosService,
  ]
})
export class Si_modulosModule {
}
