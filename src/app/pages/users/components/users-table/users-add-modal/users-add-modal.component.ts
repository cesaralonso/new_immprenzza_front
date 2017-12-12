import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { UsersService } from './../users.service';
import { UsersInterface } from './../users.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolsService } from './../../../../rols/components/rols-table/rols.service';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./users-add-modal.component.scss')],
  templateUrl: './users-add-modal.component.html'
})
export class UsersAddModalComponent extends DialogComponent<UsersInterface, any> implements OnInit {
  _rol: string[] = [];
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
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
    dialogService: DialogService
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
        .insert(values)
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
