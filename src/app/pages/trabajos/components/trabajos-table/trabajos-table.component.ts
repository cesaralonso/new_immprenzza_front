import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TrabajosInterface } from './trabajos.interface';
import { TrabajosResponseInterface } from './trabajos-response.interface';
import { Component, OnInit } from '@angular/core';
import { TrabajosService } from './trabajos.service';
import { TrabajosAddModalComponent } from './trabajos-add-modal/trabajos-add-modal.component';
import { TrabajosEditModalComponent } from './trabajos-edit-modal/trabajos-edit-modal.component';
@Component({
selector: 'trabajos-table',
templateUrl: './trabajos-table.html',
styleUrls: ['./trabajos-table.scss'],
})
export class TrabajosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtrabajos';
    sortOrder = 'asc';
    constructor(
      private service: TrabajosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.obtenerAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TrabajosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(trabajos: TrabajosInterface) {
      const disposable = this.dialogService.addDialog(TrabajosEditModalComponent, trabajos)
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
          this.service.remove(item.idtrabajo)
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
            (data: TrabajosResponseInterface) =>  {
                this.data = data.result
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
