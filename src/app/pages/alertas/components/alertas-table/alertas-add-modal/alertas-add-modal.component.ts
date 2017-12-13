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
  selector: 'add-service-modal',
  styleUrls: [('./alertas-add-modal.component.scss')],
  templateUrl: './alertas-add-modal.component.html'
})
export class AlertasAddModalComponent extends DialogComponent<AlertasInterface, any> implements OnInit {
  _personal: string[] = [];
  _tipoalerta: string[] = [];
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
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
    dialogService: DialogService
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
  }
  getPersonal() {
      this.personalsService.all()
      .subscribe(
          (data: any) => this._personal = data.result,
      );
  }
  getTipoalerta() {
      this.tipoalertasService.all()
      .subscribe(
          (data: any) => this._tipoalerta = data.result,
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
        .insert(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
