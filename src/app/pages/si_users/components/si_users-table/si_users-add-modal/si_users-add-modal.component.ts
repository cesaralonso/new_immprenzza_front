import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Si_usersService } from './../si_users.service';
import { Si_usersInterface } from './../si_users.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Si_rolsService } from './../../../../si_rols/components/si_rols-table/si_rols.service';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./si_users-add-modal.component.scss')],
  templateUrl: './si_users-add-modal.component.html'
})
export class Si_usersAddModalComponent extends DialogComponent<Si_usersInterface, any> implements OnInit {
  _si_rol: string[] = [];
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idsi_userAC: AbstractControl;
  usuarioAC: AbstractControl;
  emailAC: AbstractControl;
  passwordAC: AbstractControl;
  Rol_idsi_rolAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
    private service: Si_usersService,
      private si_rolsService: Si_rolsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'idsi_userAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'usuarioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'emailAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'passwordAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'Rol_idsi_rolAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.idsi_userAC = this.form.controls['idsi_userAC'];
    this.usuarioAC = this.form.controls['usuarioAC'];
    this.emailAC = this.form.controls['emailAC'];
    this.passwordAC = this.form.controls['passwordAC'];
    this.Rol_idsi_rolAC = this.form.controls['Rol_idsi_rolAC'];
    this.bajaAC = this.form.controls['bajaAC'];
    this.created_byAC = this.form.controls['created_byAC'];
    this.created_atAC = this.form.controls['created_atAC'];
    this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getSi_rol();
  }
  getSi_rol() {
      this.si_rolsService.all()
      .subscribe(
          (data: any) => this._si_rol = data,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: Si_usersInterface): void {
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
