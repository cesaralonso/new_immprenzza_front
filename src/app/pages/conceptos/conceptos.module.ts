import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './conceptos.routing';
import { ConceptosComponent } from './conceptos.component';
import { ConceptosAddModalComponent } from './components/conceptos-table/conceptos-add-modal/conceptos-add-modal.component';
import { ConceptosEditModalComponent } from './components/conceptos-table/conceptos-edit-modal/conceptos-edit-modal.component';
import { ConceptosService } from './components/conceptos-table/conceptos.service';
import { ConceptosTableComponent } from './components/conceptos-table/conceptos-table.component';
import { ConceptosFilterPipe } from './components/conceptos-table/conceptos-filter.pipe';
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
    ConceptosComponent,
    ConceptosTableComponent,
    ConceptosFilterPipe,
    ConceptosAddModalComponent,
    ConceptosEditModalComponent,
  ],
  entryComponents: [
    ConceptosAddModalComponent,
    ConceptosEditModalComponent,
  ],
  providers: [
    ConceptosService,
  ]
})
export class ConceptosModule {
}
