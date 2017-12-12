import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { UsersService } from './../users.service';
import { UsersInterface } from './../users.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolsService } from './../../../../rols/components/rols-table/rols.service';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./users-edit-modal.component.scss')],
  templateUrl: './users-edit-modal.component.html'
})
export class UsersEditModalComponent extends DialogComponent<UsersInterface, any> implements OnInit, UsersInterface {
  _rol: string[] = [];

  iduser: number;
  usuario: string;
  password: string;
  rol_idrol: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  user: UsersInterface = {
      iduser: 0,
      usuario: '',
      password: '',
      rol_idrol: 0,
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  iduserAC: AbstractControl;
  usuarioAC: AbstractControl;
  passwordAC: AbstractControl;
  rol_idrolAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: UsersService,
      private rolsService: RolsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'iduserAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'usuarioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'passwordAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'rol_idrolAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.iduserAC = this.form.controls['iduserAC'];
  this.usuarioAC = this.form.controls['usuarioAC'];
  this.passwordAC = this.form.controls['passwordAC'];
  this.rol_idrolAC = this.form.controls['rol_idrolAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getRol();
      this.getUsers();
  }

  getRol() {
      this.rolsService.all()
      .subscribe(
          (data: any) => this._rol = data,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: UsersInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  iduser: this.iduser,
                  usuario: this.usuario,
                  password: this.password,
                  rol_idrol: this.rol_idrol,
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
   private getUsers(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.user = data;
           },
           error => console.log(error),
           () => console.log('Get user complete'));
  }
}
