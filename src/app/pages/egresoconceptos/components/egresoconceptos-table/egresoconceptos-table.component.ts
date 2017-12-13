import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EgresoconceptosInterface } from './egresoconceptos.interface';
import { EgresoconceptosResponseInterface } from './egresoconceptos-response.interface';
import { Component, OnInit } from '@angular/core';
import { EgresoconceptosService } from './egresoconceptos.service';
import { EgresoconceptosAddModalComponent } from './egresoconceptos-add-modal/egresoconceptos-add-modal.component';
import { EgresoconceptosEditModalComponent } from './egresoconceptos-edit-modal/egresoconceptos-edit-modal.component';
@Component({
selector: 'egresoconceptos-table',
templateUrl: './egresoconceptos-table.html',
styleUrls: ['./egresoconceptos-table.scss'],
})
export class EgresoconceptosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idegresoconceptos';
    sortOrder = 'asc';
    constructor(
      private service: EgresoconceptosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.obtenerAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(EgresoconceptosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(egresoconceptos: EgresoconceptosInterface) {
      const disposable = this.dialogService.addDialog(EgresoconceptosEditModalComponent, egresoconceptos)
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
          this.service.remove(item.idegresoconcepto)
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
            (data: EgresoconceptosResponseInterface) =>  {
                this.data = data.result
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
