import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PermisosInterface } from './permisos.interface';
import { PermisosResponseInterface } from './permisos-response.interface';
import { Component, OnInit } from '@angular/core';
import { PermisosService } from './permisos.service';
import { PermisosAddModalComponent } from './permisos-add-modal/permisos-add-modal.component';
import { PermisosEditModalComponent } from './permisos-edit-modal/permisos-edit-modal.component';
@Component({
selector: 'permisos-table',
templateUrl: './permisos-table.html',
styleUrls: ['./permisos-table.scss'],
})
export class PermisosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpermisos';
    sortOrder = 'asc';
    constructor(
      private service: PermisosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PermisosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(permisos: PermisosInterface) {
      const disposable = this.dialogService.addDialog(PermisosEditModalComponent, permisos)
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
          this.service.remove(item.idpermiso)
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
