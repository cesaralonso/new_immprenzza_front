import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { UsersInterface } from './users.interface';
import { UsersResponseInterface } from './users-response.interface';
import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { UsersAddModalComponent } from './users-add-modal/users-add-modal.component';
import { UsersEditModalComponent } from './users-edit-modal/users-edit-modal.component';
@Component({
selector: 'users-table',
templateUrl: './users-table.html',
styleUrls: ['./users-table.scss'],
})
export class UsersTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idusers';
    sortOrder = 'asc';
    constructor(
      private service: UsersService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(UsersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(users: UsersInterface) {
      const disposable = this.dialogService.addDialog(UsersEditModalComponent, users)
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
          this.service.remove(item.iduser)
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
