import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdensService } from './../ordens.service';
import { OrdensInterface } from './../ordens.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from './../../../../clientes/components/clientes-table/clientes.service';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./ordens-edit-modal.component.scss')],
  templateUrl: './ordens-edit-modal.component.html'
})
export class OrdensEditModalComponent extends DialogComponent<OrdensInterface, any> implements OnInit, OrdensInterface {
  _cliente: string[] = [];

  idorden: number;
  factura: boolean;
  fecha: string;
  status_avance: string;
  status_pago: string;
  subtotal: number;
  total: number;
  iva: number;
  deuda: number;
  f_limite: string;
  cliente_idcliente: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  orden: OrdensInterface = {
      idorden: 0,
      factura: false,
      fecha: '',
      status_avance: '',
      status_pago: '',
      subtotal: 0,
      total: 0,
      iva: 0,
      deuda: 0,
      f_limite: '',
      cliente_idcliente: 0,
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  idordenAC: AbstractControl;
  facturaAC: AbstractControl;
  fechaAC: AbstractControl;
  status_avanceAC: AbstractControl;
  status_pagoAC: AbstractControl;
  subtotalAC: AbstractControl;
  totalAC: AbstractControl;
  ivaAC: AbstractControl;
  deudaAC: AbstractControl;
  f_limiteAC: AbstractControl;
  cliente_idclienteAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: OrdensService,
      private clientesService: ClientesService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idordenAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'facturaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'status_avanceAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'status_pagoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'subtotalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'totalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'ivaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'deudaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'f_limiteAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'cliente_idclienteAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idordenAC = this.form.controls['idordenAC'];
  this.facturaAC = this.form.controls['facturaAC'];
  this.fechaAC = this.form.controls['fechaAC'];
  this.status_avanceAC = this.form.controls['status_avanceAC'];
  this.status_pagoAC = this.form.controls['status_pagoAC'];
  this.subtotalAC = this.form.controls['subtotalAC'];
  this.totalAC = this.form.controls['totalAC'];
  this.ivaAC = this.form.controls['ivaAC'];
  this.deudaAC = this.form.controls['deudaAC'];
  this.f_limiteAC = this.form.controls['f_limiteAC'];
  this.cliente_idclienteAC = this.form.controls['cliente_idclienteAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getCliente();
      this.getOrdens();
  }

  getCliente() {
      this.clientesService.all()
      .subscribe(
          (data: any) => this._cliente = data,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: OrdensInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idorden: this.idorden,
                  factura: this.factura,
                  fecha: this.fecha,
                  status_avance: this.status_avance,
                  status_pago: this.status_pago,
                  subtotal: this.subtotal,
                  total: this.total,
                  iva: this.iva,
                  deuda: this.deuda,
                  f_limite: this.f_limite,
                  cliente_idcliente: this.cliente_idcliente,
                  baja: this.baja,
                  created_by: this.created_by,
                  created_at: this.created_at,
                  modified_at: this.modified_at,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
   private getOrdens(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.orden = data;
           },
           error => console.log(error),
           () => console.log('Get orden complete'));
  }
}
