import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CheckoutsService } from './../checkouts.service';
import { CheckoutsInterface } from './../checkouts.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonalsService } from './../../../../personals/components/personals-table/personals.service';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./checkouts-edit-modal.component.scss')],
  templateUrl: './checkouts-edit-modal.component.html'
})
export class CheckoutsEditModalComponent extends DialogComponent<CheckoutsInterface, any> implements OnInit, CheckoutsInterface {
  _personal: string[] = [];

  idcheckout: number;
  entrada: string;
  salida: string;
  tiempo_trabajado: number;
  personal_idpersonal: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  checkout: CheckoutsInterface = {
      idcheckout: 0,
      entrada: '',
      salida: '',
      tiempo_trabajado: 0,
      personal_idpersonal: 0,
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  idcheckoutAC: AbstractControl;
  entradaAC: AbstractControl;
  salidaAC: AbstractControl;
  tiempo_trabajadoAC: AbstractControl;
  personal_idpersonalAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: CheckoutsService,
      private personalsService: PersonalsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idcheckoutAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'entradaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'salidaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'tiempo_trabajadoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'personal_idpersonalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idcheckoutAC = this.form.controls['idcheckoutAC'];
  this.entradaAC = this.form.controls['entradaAC'];
  this.salidaAC = this.form.controls['salidaAC'];
  this.tiempo_trabajadoAC = this.form.controls['tiempo_trabajadoAC'];
  this.personal_idpersonalAC = this.form.controls['personal_idpersonalAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getPersonal();
      this.getCheckouts();
  }

  getPersonal() {
      this.personalsService.all()
      .subscribe(
          (data: any) => this._personal = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: CheckoutsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idcheckout: this.idcheckout,
                  entrada: this.entrada,
                  salida: this.salida,
                  tiempo_trabajado: this.tiempo_trabajado,
                  personal_idpersonal: this.personal_idpersonal,
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
   private getCheckouts(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.checkout = data;
           },
           error => console.log(error),
           () => console.log('Get checkout complete'));
  }
}
