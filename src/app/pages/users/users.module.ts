import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './users.routing';
import { UsersComponent } from './users.component';
import { UsersAddModalComponent } from './components/users-table/users-add-modal/users-add-modal.component';
import { UsersEditModalComponent } from './components/users-table/users-edit-modal/users-edit-modal.component';
import { UsersService } from './components/users-table/users.service';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersFilterPipe } from './components/users-table/users-filter.pipe';
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
    UsersComponent,
    UsersTableComponent,
    UsersFilterPipe,
    UsersAddModalComponent,
    UsersEditModalComponent,
  ],
  entryComponents: [
    UsersAddModalComponent,
    UsersEditModalComponent,
  ],
  providers: [
    UsersService,
  ]
})
export class UsersModule {
}
