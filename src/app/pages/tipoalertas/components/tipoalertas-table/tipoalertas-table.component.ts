import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TipoalertasInterface } from './tipoalertas.interface';
import { TipoalertasResponseInterface } from './tipoalertas-response.interface';
import { Component, OnInit } from '@angular/core';
import { TipoalertasService } from './tipoalertas.service';
import { TipoalertasAddModalComponent } from './tipoalertas-add-modal/tipoalertas-add-modal.component';
import { TipoalertasEditModalComponent } from './tipoalertas-edit-modal/tipoalertas-edit-modal.component';
@Component({
selector: 'tipoalertas-table',
templateUrl: './tipoalertas-table.html',
styleUrls: ['./tipoalertas-table.scss'],
})
export class TipoalertasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtipoalertas';
    sortOrder = 'asc';
    constructor(
      private service: TipoalertasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.obtenerAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TipoalertasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(tipoalertas: TipoalertasInterface) {
      const disposable = this.dialogService.addDialog(TipoalertasEditModalComponent, tipoalertas)
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
          this.service.remove(item.idtipoalerta)
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
            (data: TipoalertasResponseInterface) =>  {
                this.data = data.result
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
