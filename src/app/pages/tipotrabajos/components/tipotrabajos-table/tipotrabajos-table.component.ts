import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TipotrabajosInterface } from './tipotrabajos.interface';
import { TipotrabajosResponseInterface } from './tipotrabajos-response.interface';
import { Component, OnInit } from '@angular/core';
import { TipotrabajosService } from './tipotrabajos.service';
import { TipotrabajosAddModalComponent } from './tipotrabajos-add-modal/tipotrabajos-add-modal.component';
import { TipotrabajosEditModalComponent } from './tipotrabajos-edit-modal/tipotrabajos-edit-modal.component';
@Component({
selector: 'tipotrabajos-table',
templateUrl: './tipotrabajos-table.html',
styleUrls: ['./tipotrabajos-table.scss'],
})
export class TipotrabajosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtipotrabajos';
    sortOrder = 'asc';
    constructor(
      private service: TipotrabajosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.obtenerAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TipotrabajosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(tipotrabajos: TipotrabajosInterface) {
      const disposable = this.dialogService.addDialog(TipotrabajosEditModalComponent, tipotrabajos)
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
          this.service.remove(item.idtipotrabajo)
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
            (data: TipotrabajosResponseInterface) =>  {
                this.data = data.result
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
