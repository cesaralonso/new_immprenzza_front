import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Si_usersService } from './../si_users.service';
import { Si_usersInterface } from './../si_users.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Si_rolsService } from './../../../../si_rols/components/si_rols-table/si_rols.service';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./si_users-edit-modal.component.scss')],
  templateUrl: './si_users-edit-modal.component.html'
})
export class Si_usersEditModalComponent extends DialogComponent<Si_usersInterface, any> implements OnInit, Si_usersInterface {
  _si_rol: string[] = [];

  idsi_user: number;
  usuario: string;
  email: string;
  password: string;
  Rol_idsi_rol: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  si_user: Si_usersInterface = {
      idsi_user: 0,
      usuario: '',
      email: '',
      password: '',
      Rol_idsi_rol: 0,
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
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
      dialogService: DialogService,
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
      this.getSi_users();
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
              .update({
                  idsi_user: this.idsi_user,
                  usuario: this.usuario,
                  email: this.email,
                  password: this.password,
                  Rol_idsi_rol: this.Rol_idsi_rol,
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
   private getSi_users(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.si_user = data;
           },
           error => console.log(error),
           () => console.log('Get si_user complete'));
  }
}
