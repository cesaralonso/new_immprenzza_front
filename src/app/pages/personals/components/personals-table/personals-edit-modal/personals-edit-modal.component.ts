import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PersonalsService } from './../personals.service';
import { PersonalsInterface } from './../personals.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { PuestosService } from './../../../../puestos/components/puestos-table/puestos.service';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./personals-edit-modal.component.scss')],
  templateUrl: './personals-edit-modal.component.html'
})
export class PersonalsEditModalComponent extends DialogComponent<PersonalsInterface, any> implements OnInit, PersonalsInterface {
  _persona: string[] = [];
  _puesto: string[] = [];

  idpersonal: number;
  f_ingreso: string;
  nomina: number;
  frec_nomina: string;
  persona_idpersona: number;
  puesto_idpuesto: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  personal: PersonalsInterface = {
      idpersonal: 0,
      f_ingreso: '',
      nomina: 0,
      frec_nomina: '',
      persona_idpersona: 0,
      puesto_idpuesto: 0,
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  idpersonalAC: AbstractControl;
  f_ingresoAC: AbstractControl;
  nominaAC: AbstractControl;
  frec_nominaAC: AbstractControl;
  persona_idpersonaAC: AbstractControl;
  puesto_idpuestoAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: PersonalsService,
      private personasService: PersonasService,
      private puestosService: PuestosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idpersonalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'f_ingresoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'nominaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'frec_nominaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'persona_idpersonaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'puesto_idpuestoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idpersonalAC = this.form.controls['idpersonalAC'];
  this.f_ingresoAC = this.form.controls['f_ingresoAC'];
  this.nominaAC = this.form.controls['nominaAC'];
  this.frec_nominaAC = this.form.controls['frec_nominaAC'];
  this.persona_idpersonaAC = this.form.controls['persona_idpersonaAC'];
  this.puesto_idpuestoAC = this.form.controls['puesto_idpuestoAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getPersona();
      this.getPuesto();
      this.getPersonals();
  }

  getPersona() {
      this.personasService.all()
      .subscribe(
          (data: any) => this._persona = data.result,
      );
  }
  getPuesto() {
      this.puestosService.all()
      .subscribe(
          (data: any) => this._puesto = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: PersonalsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idpersonal: this.idpersonal,
                  f_ingreso: this.f_ingreso,
                  nomina: this.nomina,
                  frec_nomina: this.frec_nomina,
                  persona_idpersona: this.persona_idpersona,
                  puesto_idpuesto: this.puesto_idpuesto,
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
   private getPersonals(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.personal = data;
           },
           error => console.log(error),
           () => console.log('Get personal complete'));
  }
}
