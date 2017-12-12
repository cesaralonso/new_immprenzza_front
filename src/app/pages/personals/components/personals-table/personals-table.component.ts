import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PersonalsInterface } from './personals.interface';
import { PersonalsResponseInterface } from './personals-response.interface';
import { Component, OnInit } from '@angular/core';
import { PersonalsService } from './personals.service';
import { PersonalsAddModalComponent } from './personals-add-modal/personals-add-modal.component';
import { PersonalsEditModalComponent } from './personals-edit-modal/personals-edit-modal.component';
@Component({
selector: 'personals-table',
templateUrl: './personals-table.html',
styleUrls: ['./personals-table.scss'],
})
export class PersonalsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpersonals';
    sortOrder = 'asc';
    constructor(
      private service: PersonalsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PersonalsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(personals: PersonalsInterface) {
      const disposable = this.dialogService.addDialog(PersonalsEditModalComponent, personals)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }
    onDeleteConfirm(event, item): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
          this.service.remove(item.idpersonal)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
      } else {
          console.log('item cancelado');
      }
    }
    showToast(result) {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getAll();
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data) =>  {
                this.data = data;
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
