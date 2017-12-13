import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Si_permisosService } from './../si_permisos.service';
import { Si_permisosInterface } from './../si_permisos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Si_rolsService } from './../../../../si_rols/components/si_rols-table/si_rols.service';
import { Si_modulosService } from './../../../../si_modulos/components/si_modulos-table/si_modulos.service';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./si_permisos-edit-modal.component.scss')],
  templateUrl: './si_permisos-edit-modal.component.html'
})
export class Si_permisosEditModalComponent extends DialogComponent<Si_permisosInterface, any> implements OnInit, Si_permisosInterface {
  _si_rol: string[] = [];
  _si_modulo: string[] = [];

  idsi_permiso: number;
  acceso: boolean;
  Rol_idsi_rol: number;
  Modulo_idsi_modulo: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  si_permiso: Si_permisosInterface = {
      idsi_permiso: 0,
      acceso: false,
      Rol_idsi_rol: 0,
      Modulo_idsi_modulo: 0,
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  idsi_permisoAC: AbstractControl;
  accesoAC: AbstractControl;
  Rol_idsi_rolAC: AbstractControl;
  Modulo_idsi_moduloAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: Si_permisosService,
      private si_rolsService: Si_rolsService,
      private si_modulosService: Si_modulosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idsi_permisoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'accesoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'Rol_idsi_rolAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'Modulo_idsi_moduloAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idsi_permisoAC = this.form.controls['idsi_permisoAC'];
  this.accesoAC = this.form.controls['accesoAC'];
  this.Rol_idsi_rolAC = this.form.controls['Rol_idsi_rolAC'];
  this.Modulo_idsi_moduloAC = this.form.controls['Modulo_idsi_moduloAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getSi_rol();
      this.getSi_modulo();
      this.getSi_permisos();
  }

  getSi_rol() {
      this.si_rolsService.all()
      .subscribe(
          (data: any) => this._si_rol = data.result,
      );
  }
  getSi_modulo() {
      this.si_modulosService.all()
      .subscribe(
          (data: any) => this._si_modulo = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: Si_permisosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idsi_permiso: this.idsi_permiso,
                  acceso: this.acceso,
                  Rol_idsi_rol: this.Rol_idsi_rol,
                  Modulo_idsi_modulo: this.Modulo_idsi_modulo,
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
   private getSi_permisos(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.si_permiso = data;
           },
           error => console.log(error),
           () => console.log('Get si_permiso complete'));
  }
}
