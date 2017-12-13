import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CheckoutsInterface } from './checkouts.interface';
import { CheckoutsResponseInterface } from './checkouts-response.interface';
import { Component, OnInit } from '@angular/core';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsAddModalComponent } from './checkouts-add-modal/checkouts-add-modal.component';
import { CheckoutsEditModalComponent } from './checkouts-edit-modal/checkouts-edit-modal.component';
@Component({
selector: 'checkouts-table',
templateUrl: './checkouts-table.html',
styleUrls: ['./checkouts-table.scss'],
})
export class CheckoutsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcheckouts';
    sortOrder = 'asc';
    constructor(
      private service: CheckoutsService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.obtenerAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(CheckoutsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(checkouts: CheckoutsInterface) {
      const disposable = this.dialogService.addDialog(CheckoutsEditModalComponent, checkouts)
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
          this.service.remove(item.idcheckout)
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
        this.obtenerAll();
      } else {
        this.toastrService.error(result.message);
      }
    }
    private obtenerAll(): void {
      this.service
        .all()
        .subscribe(
            (data: CheckoutsResponseInterface) =>  {
                this.data = data.result
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
