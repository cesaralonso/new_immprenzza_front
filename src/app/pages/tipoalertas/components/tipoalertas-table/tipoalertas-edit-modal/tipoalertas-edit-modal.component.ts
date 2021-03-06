import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TipoalertasService } from './../tipoalertas.service';
import { TipoalertasInterface } from './../tipoalertas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./tipoalertas-edit-modal.component.scss')],
  templateUrl: './tipoalertas-edit-modal.component.html'
})
export class TipoalertasEditModalComponent extends DialogComponent<TipoalertasInterface, any> implements OnInit, TipoalertasInterface {

  idtipoalerta: number;
  nombre: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  tipoalerta: TipoalertasInterface = {
      idtipoalerta: 0,
      nombre: '',
};
  idtipoalertaAC: AbstractControl;
  nombreAC: AbstractControl;
  constructor(
      private service: TipoalertasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idtipoalertaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idtipoalertaAC = this.form.controls['idtipoalertaAC'];
  this.nombreAC = this.form.controls['nombreAC'];
  }
  ngOnInit() {
      this.getTipoalertas();
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: TipoalertasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idtipoalerta: this.idtipoalerta,
                  nombre: this.nombre,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
   private getTipoalertas(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.tipoalerta = data;
           },
           error => console.log(error),
           () => console.log('Get tipoalerta complete'));
  }
}
