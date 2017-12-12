import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ClientesInterface } from './clientes.interface';
import { ClientesResponseInterface } from './clientes-response.interface';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { ClientesAddModalComponent } from './clientes-add-modal/clientes-add-modal.component';
import { ClientesEditModalComponent } from './clientes-edit-modal/clientes-edit-modal.component';
@Component({
selector: 'clientes-table',
templateUrl: './clientes-table.html',
styleUrls: ['./clientes-table.scss'],
})
export class ClientesTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idclientes';
    sortOrder = 'asc';
    constructor(
      private service: ClientesService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ClientesAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(clientes: ClientesInterface) {
      const disposable = this.dialogService.addDialog(ClientesEditModalComponent, clientes)
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
          this.service.remove(item.idcliente)
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
