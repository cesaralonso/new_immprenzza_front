import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ClientesService } from './../clientes.service';
import { ClientesInterface } from './../clientes.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./clientes-add-modal.component.scss')],
  templateUrl: './clientes-add-modal.component.html'
})
export class ClientesAddModalComponent extends DialogComponent<ClientesInterface, any> implements OnInit {
  _persona: string[] = [];
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idclienteAC: AbstractControl;
  persona_idpersonaAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
    private service: ClientesService,
      private personasService: PersonasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'idclienteAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'persona_idpersonaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.idclienteAC = this.form.controls['idclienteAC'];
    this.persona_idpersonaAC = this.form.controls['persona_idpersonaAC'];
    this.bajaAC = this.form.controls['bajaAC'];
    this.created_byAC = this.form.controls['created_byAC'];
    this.created_atAC = this.form.controls['created_atAC'];
    this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getPersona();
  }
  getPersona() {
      this.personasService.all()
      .subscribe(
          (data: any) => this._persona = data,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: ClientesInterface): void {
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
