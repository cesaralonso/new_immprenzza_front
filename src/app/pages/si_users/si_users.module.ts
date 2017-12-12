import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './si_users.routing';
import { Si_usersComponent } from './si_users.component';
import { Si_usersAddModalComponent } from './components/si_users-table/si_users-add-modal/si_users-add-modal.component';
import { Si_usersEditModalComponent } from './components/si_users-table/si_users-edit-modal/si_users-edit-modal.component';
import { Si_usersService } from './components/si_users-table/si_users.service';
import { Si_usersTableComponent } from './components/si_users-table/si_users-table.component';
import { Si_usersFilterPipe } from './components/si_users-table/si_users-filter.pipe';
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
    Si_usersComponent,
    Si_usersTableComponent,
    Si_usersFilterPipe,
    Si_usersAddModalComponent,
    Si_usersEditModalComponent,
  ],
  entryComponents: [
    Si_usersAddModalComponent,
    Si_usersEditModalComponent,
  ],
  providers: [
    Si_usersService,
  ]
})
export class Si_usersModule {
}
