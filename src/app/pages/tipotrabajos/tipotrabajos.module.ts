import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './tipotrabajos.routing';
import { TipotrabajosComponent } from './tipotrabajos.component';
import { TipotrabajosAddModalComponent } from './components/tipotrabajos-table/tipotrabajos-add-modal/tipotrabajos-add-modal.component';
import { TipotrabajosEditModalComponent } from './components/tipotrabajos-table/tipotrabajos-edit-modal/tipotrabajos-edit-modal.component';
import { TipotrabajosService } from './components/tipotrabajos-table/tipotrabajos.service';
import { TipotrabajosTableComponent } from './components/tipotrabajos-table/tipotrabajos-table.component';
import { TipotrabajosFilterPipe } from './components/tipotrabajos-table/tipotrabajos-filter.pipe';
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
    TipotrabajosComponent,
    TipotrabajosTableComponent,
    TipotrabajosFilterPipe,
    TipotrabajosAddModalComponent,
    TipotrabajosEditModalComponent,
  ],
  entryComponents: [
    TipotrabajosAddModalComponent,
    TipotrabajosEditModalComponent,
  ],
  providers: [
    TipotrabajosService,
  ]
})
export class TipotrabajosModule {
}
