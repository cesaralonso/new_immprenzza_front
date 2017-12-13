import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ModulosInterface } from './modulos.interface';
import { ModulosResponseInterface } from './modulos-response.interface';
import { Component, OnInit } from '@angular/core';
import { ModulosService } from './modulos.service';
import { ModulosAddModalComponent } from './modulos-add-modal/modulos-add-modal.component';
import { ModulosEditModalComponent } from './modulos-edit-modal/modulos-edit-modal.component';
@Component({
selector: 'modulos-table',
templateUrl: './modulos-table.html',
styleUrls: ['./modulos-table.scss'],
})
export class ModulosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idmodulos';
    sortOrder = 'asc';
    constructor(
      private service: ModulosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.obtenerAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ModulosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(modulos: ModulosInterface) {
      const disposable = this.dialogService.addDialog(ModulosEditModalComponent, modulos)
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
          this.service.remove(item.idmodulo)
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
            (data: ModulosResponseInterface) =>  {
                this.data = data.result
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
