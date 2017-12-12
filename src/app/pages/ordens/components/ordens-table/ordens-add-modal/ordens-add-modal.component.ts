import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdensService } from './../ordens.service';
import { OrdensInterface } from './../ordens.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from './../../../../clientes/components/clientes-table/clientes.service';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./ordens-add-modal.component.scss')],
  templateUrl: './ordens-add-modal.component.html'
})
export class OrdensAddModalComponent extends DialogComponent<OrdensInterface, any> implements OnInit {
  _cliente: string[] = [];
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
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
    dialogService: DialogService
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
        .insert(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
