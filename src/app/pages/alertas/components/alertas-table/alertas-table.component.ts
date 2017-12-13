import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { AlertasInterface } from './alertas.interface';
import { AlertasResponseInterface } from './alertas-response.interface';
import { Component, OnInit } from '@angular/core';
import { AlertasService } from './alertas.service';
import { AlertasAddModalComponent } from './alertas-add-modal/alertas-add-modal.component';
import { AlertasEditModalComponent } from './alertas-edit-modal/alertas-edit-modal.component';
@Component({
selector: 'alertas-table',
templateUrl: './alertas-table.html',
styleUrls: ['./alertas-table.scss'],
})
export class AlertasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idalertas';
    sortOrder = 'asc';
    constructor(
      private service: AlertasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.obtenerAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(AlertasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(alertas: AlertasInterface) {
      const disposable = this.dialogService.addDialog(AlertasEditModalComponent, alertas)
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
          this.service.remove(item.idalerta)
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
            (data: AlertasResponseInterface) =>  {
                this.data = data.result
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
