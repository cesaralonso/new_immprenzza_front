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
  selector: 'add-service-modal',
  styleUrls: [('./personals-add-modal.component.scss')],
  templateUrl: './personals-add-modal.component.html'
})
export class PersonalsAddModalComponent extends DialogComponent<PersonalsInterface, any> implements OnInit {
  _persona: string[] = [];
  _puesto: string[] = [];
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
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
    dialogService: DialogService
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
  }
  getPersona() {
      this.personasService.all()
      .subscribe(
          (data: any) => this._persona = data,
      );
  }
  getPuesto() {
      this.puestosService.all()
      .subscribe(
          (data: any) => this._puesto = data,
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
        .insert(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
