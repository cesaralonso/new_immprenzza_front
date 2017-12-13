import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { AbonosInterface } from './abonos.interface';
import { AbonosResponseInterface } from './abonos-response.interface';
import { Component, OnInit } from '@angular/core';
import { AbonosService } from './abonos.service';
import { AbonosAddModalComponent } from './abonos-add-modal/abonos-add-modal.component';
import { AbonosEditModalComponent } from './abonos-edit-modal/abonos-edit-modal.component';
@Component({
selector: 'abonos-table',
templateUrl: './abonos-table.html',
styleUrls: ['./abonos-table.scss'],
})
export class AbonosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idabonos';
    sortOrder = 'asc';
    constructor(
      private service: AbonosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.obtenerAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(AbonosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(abonos: AbonosInterface) {
      const disposable = this.dialogService.addDialog(AbonosEditModalComponent, abonos)
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
          this.service.remove(item.idabono)
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
            (data: AbonosResponseInterface) =>  {
                this.data = data.result
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
