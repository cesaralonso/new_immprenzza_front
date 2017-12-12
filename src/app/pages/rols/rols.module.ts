import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './rols.routing';
import { RolsComponent } from './rols.component';
import { RolsAddModalComponent } from './components/rols-table/rols-add-modal/rols-add-modal.component';
import { RolsEditModalComponent } from './components/rols-table/rols-edit-modal/rols-edit-modal.component';
import { RolsService } from './components/rols-table/rols.service';
import { RolsTableComponent } from './components/rols-table/rols-table.component';
import { RolsFilterPipe } from './components/rols-table/rols-filter.pipe';
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
    RolsComponent,
    RolsTableComponent,
    RolsFilterPipe,
    RolsAddModalComponent,
    RolsEditModalComponent,
  ],
  entryComponents: [
    RolsAddModalComponent,
    RolsEditModalComponent,
  ],
  providers: [
    RolsService,
  ]
})
export class RolsModule {
}
