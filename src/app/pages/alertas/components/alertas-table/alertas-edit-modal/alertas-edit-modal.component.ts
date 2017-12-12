import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { AlertasService } from './../alertas.service';
import { AlertasInterface } from './../alertas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonalsService } from './../../../../personals/components/personals-table/personals.service';
import { TipoalertasService } from './../../../../tipoalertas/components/tipoalertas-table/tipoalertas.service';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./alertas-edit-modal.component.scss')],
  templateUrl: './alertas-edit-modal.component.html'
})
export class AlertasEditModalComponent extends DialogComponent<AlertasInterface, any> implements OnInit, AlertasInterface {
  _personal: string[] = [];
  _tipoalerta: string[] = [];

  idalerta: number;
  descripcion: string;
  fecha: string;
  status: string;
  personal_idpersonal: number;
  tipoalerta_idtipoalerta: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  alerta: AlertasInterface = {
      idalerta: 0,
      descripcion: '',
      fecha: '',
      status: '',
      personal_idpersonal: 0,
      tipoalerta_idtipoalerta: 0,
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  idalertaAC: AbstractControl;
  descripcionAC: AbstractControl;
  fechaAC: AbstractControl;
  statusAC: AbstractControl;
  personal_idpersonalAC: AbstractControl;
  tipoalerta_idtipoalertaAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: AlertasService,
      private personalsService: PersonalsService,
      private tipoalertasService: TipoalertasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idalertaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'descripcionAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'personal_idpersonalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'tipoalerta_idtipoalertaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idalertaAC = this.form.controls['idalertaAC'];
  this.descripcionAC = this.form.controls['descripcionAC'];
  this.fechaAC = this.form.controls['fechaAC'];
  this.statusAC = this.form.controls['statusAC'];
  this.personal_idpersonalAC = this.form.controls['personal_idpersonalAC'];
  this.tipoalerta_idtipoalertaAC = this.form.controls['tipoalerta_idtipoalertaAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getPersonal();
      this.getTipoalerta();
      this.getAlertas();
  }

  getPersonal() {
      this.personalsService.all()
      .subscribe(
          (data: any) => this._personal = data,
      );
  }
  getTipoalerta() {
      this.tipoalertasService.all()
      .subscribe(
          (data: any) => this._tipoalerta = data,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: AlertasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idalerta: this.idalerta,
                  descripcion: this.descripcion,
                  fecha: this.fecha,
                  status: this.status,
                  personal_idpersonal: this.personal_idpersonal,
                  tipoalerta_idtipoalerta: this.tipoalerta_idtipoalerta,
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
   private getAlertas(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.alerta = data;
           },
           error => console.log(error),
           () => console.log('Get alerta complete'));
  }
}
