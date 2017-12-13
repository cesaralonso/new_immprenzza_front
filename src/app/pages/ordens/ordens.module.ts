import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './ordens.routing';
import { OrdensComponent } from './ordens.component';
import { OrdensAddModalComponent } from './components/ordens-table/ordens-add-modal/ordens-add-modal.component';
import { OrdensEditModalComponent } from './components/ordens-table/ordens-edit-modal/ordens-edit-modal.component';
import { OrdensService } from './components/ordens-table/ordens.service';
import { OrdensTableComponent } from './components/ordens-table/ordens-table.component';
import { OrdensFilterPipe } from './components/ordens-table/ordens-filter.pipe';
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
    OrdensComponent,
    OrdensTableComponent,
    OrdensFilterPipe,
    OrdensAddModalComponent,
    OrdensEditModalComponent,
  ],
  entryComponents: [
    OrdensAddModalComponent,
    OrdensEditModalComponent,
  ],
  providers: [
    OrdensService,
  ]
})
export class OrdensModule {
}
