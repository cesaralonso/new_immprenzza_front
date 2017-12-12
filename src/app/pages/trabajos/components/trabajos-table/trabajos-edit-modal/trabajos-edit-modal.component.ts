import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TrabajosService } from './../trabajos.service';
import { TrabajosInterface } from './../trabajos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonalsService } from './../../../../personals/components/personals-table/personals.service';
import { TipotrabajosService } from './../../../../tipotrabajos/components/tipotrabajos-table/tipotrabajos.service';
import { OrdensService } from './../../../../ordens/components/ordens-table/ordens.service';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./trabajos-edit-modal.component.scss')],
  templateUrl: './trabajos-edit-modal.component.html'
})
export class TrabajosEditModalComponent extends DialogComponent<TrabajosInterface, any> implements OnInit, TrabajosInterface {
  _personal: string[] = [];
  _tipotrabajo: string[] = [];
  _orden: string[] = [];

  idtrabajo: number;
  cantidad: number;
  archivo: string;
  foto: string;
  f_entregaesperada: string;
  f_entregareal: string;
  status: string;
  especificaciones: string;
  f_recibe: string;
  total: number;
  personal_idpersonal: number;
  tipotrabajo_idtipotrabajo: number;
  orden_idorden: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  trabajo: TrabajosInterface = {
      idtrabajo: 0,
      cantidad: 0,
      archivo: '',
      foto: '',
      f_entregaesperada: '',
      f_entregareal: '',
      status: '',
      especificaciones: '',
      f_recibe: '',
      total: 0,
      personal_idpersonal: 0,
      tipotrabajo_idtipotrabajo: 0,
      orden_idorden: 0,
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  idtrabajoAC: AbstractControl;
  cantidadAC: AbstractControl;
  archivoAC: AbstractControl;
  fotoAC: AbstractControl;
  f_entregaesperadaAC: AbstractControl;
  f_entregarealAC: AbstractControl;
  statusAC: AbstractControl;
  especificacionesAC: AbstractControl;
  f_recibeAC: AbstractControl;
  totalAC: AbstractControl;
  personal_idpersonalAC: AbstractControl;
  tipotrabajo_idtipotrabajoAC: AbstractControl;
  orden_idordenAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: TrabajosService,
      private personalsService: PersonalsService,
      private tipotrabajosService: TipotrabajosService,
      private ordensService: OrdensService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idtrabajoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'cantidadAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'archivoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'fotoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'f_entregaesperadaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'f_entregarealAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'especificacionesAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'f_recibeAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'totalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'personal_idpersonalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'tipotrabajo_idtipotrabajoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'orden_idordenAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idtrabajoAC = this.form.controls['idtrabajoAC'];
  this.cantidadAC = this.form.controls['cantidadAC'];
  this.archivoAC = this.form.controls['archivoAC'];
  this.fotoAC = this.form.controls['fotoAC'];
  this.f_entregaesperadaAC = this.form.controls['f_entregaesperadaAC'];
  this.f_entregarealAC = this.form.controls['f_entregarealAC'];
  this.statusAC = this.form.controls['statusAC'];
  this.especificacionesAC = this.form.controls['especificacionesAC'];
  this.f_recibeAC = this.form.controls['f_recibeAC'];
  this.totalAC = this.form.controls['totalAC'];
  this.personal_idpersonalAC = this.form.controls['personal_idpersonalAC'];
  this.tipotrabajo_idtipotrabajoAC = this.form.controls['tipotrabajo_idtipotrabajoAC'];
  this.orden_idordenAC = this.form.controls['orden_idordenAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getPersonal();
      this.getTipotrabajo();
      this.getOrden();
      this.getTrabajos();
  }

  getPersonal() {
      this.personalsService.all()
      .subscribe(
          (data: any) => this._personal = data,
      );
  }
  getTipotrabajo() {
      this.tipotrabajosService.all()
      .subscribe(
          (data: any) => this._tipotrabajo = data,
      );
  }
  getOrden() {
      this.ordensService.all()
      .subscribe(
          (data: any) => this._orden = data,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: TrabajosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idtrabajo: this.idtrabajo,
                  cantidad: this.cantidad,
                  archivo: this.archivo,
                  foto: this.foto,
                  f_entregaesperada: this.f_entregaesperada,
                  f_entregareal: this.f_entregareal,
                  status: this.status,
                  especificaciones: this.especificaciones,
                  f_recibe: this.f_recibe,
                  total: this.total,
                  personal_idpersonal: this.personal_idpersonal,
                  tipotrabajo_idtipotrabajo: this.tipotrabajo_idtipotrabajo,
                  orden_idorden: this.orden_idorden,
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
   private getTrabajos(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.trabajo = data;
           },
           error => console.log(error),
           () => console.log('Get trabajo complete'));
  }
}
