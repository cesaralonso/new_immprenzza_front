import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './si_rols.routing';
import { Si_rolsComponent } from './si_rols.component';
import { Si_rolsAddModalComponent } from './components/si_rols-table/si_rols-add-modal/si_rols-add-modal.component';
import { Si_rolsEditModalComponent } from './components/si_rols-table/si_rols-edit-modal/si_rols-edit-modal.component';
import { Si_rolsService } from './components/si_rols-table/si_rols.service';
import { Si_rolsTableComponent } from './components/si_rols-table/si_rols-table.component';
import { Si_rolsFilterPipe } from './components/si_rols-table/si_rols-filter.pipe';
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
    Si_rolsComponent,
    Si_rolsTableComponent,
    Si_rolsFilterPipe,
    Si_rolsAddModalComponent,
    Si_rolsEditModalComponent,
  ],
  entryComponents: [
    Si_rolsAddModalComponent,
    Si_rolsEditModalComponent,
  ],
  providers: [
    Si_rolsService,
  ]
})
export class Si_rolsModule {
}
