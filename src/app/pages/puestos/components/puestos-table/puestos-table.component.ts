import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PuestosInterface } from './puestos.interface';
import { PuestosResponseInterface } from './puestos-response.interface';
import { Component, OnInit } from '@angular/core';
import { PuestosService } from './puestos.service';
import { PuestosAddModalComponent } from './puestos-add-modal/puestos-add-modal.component';
import { PuestosEditModalComponent } from './puestos-edit-modal/puestos-edit-modal.component';
@Component({
selector: 'puestos-table',
templateUrl: './puestos-table.html',
styleUrls: ['./puestos-table.scss'],
})
export class PuestosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpuestos';
    sortOrder = 'asc';
    constructor(
      private service: PuestosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PuestosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(puestos: PuestosInterface) {
      const disposable = this.dialogService.addDialog(PuestosEditModalComponent, puestos)
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
          this.service.remove(item.idpuesto)
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
