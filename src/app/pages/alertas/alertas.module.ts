import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './alertas.routing';
import { AlertasComponent } from './alertas.component';
import { AlertasAddModalComponent } from './components/alertas-table/alertas-add-modal/alertas-add-modal.component';
import { AlertasEditModalComponent } from './components/alertas-table/alertas-edit-modal/alertas-edit-modal.component';
import { AlertasService } from './components/alertas-table/alertas.service';
import { AlertasTableComponent } from './components/alertas-table/alertas-table.component';
import { AlertasFilterPipe } from './components/alertas-table/alertas-filter.pipe';
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
    AlertasComponent,
    AlertasTableComponent,
    AlertasFilterPipe,
    AlertasAddModalComponent,
    AlertasEditModalComponent,
  ],
  entryComponents: [
    AlertasAddModalComponent,
    AlertasEditModalComponent,
  ],
  providers: [
    AlertasService,
  ]
})
export class AlertasModule {
}
