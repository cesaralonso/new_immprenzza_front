import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisosService } from './../permisos.service';
import { PermisosInterface } from './../permisos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolsService } from './../../../../rols/components/rols-table/rols.service';
import { ModulosService } from './../../../../modulos/components/modulos-table/modulos.service';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./permisos-edit-modal.component.scss')],
  templateUrl: './permisos-edit-modal.component.html'
})
export class PermisosEditModalComponent extends DialogComponent<PermisosInterface, any> implements OnInit, PermisosInterface {
  _rol: string[] = [];
  _modulo: string[] = [];

  idpermiso: number;
  acceso: boolean;
  rol_idrol: number;
  modulo_idmodulo: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  permiso: PermisosInterface = {
      idpermiso: 0,
      acceso: false,
      rol_idrol: 0,
      modulo_idmodulo: 0,
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  idpermisoAC: AbstractControl;
  accesoAC: AbstractControl;
  rol_idrolAC: AbstractControl;
  modulo_idmoduloAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: PermisosService,
      private rolsService: RolsService,
      private modulosService: ModulosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idpermisoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'accesoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'rol_idrolAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modulo_idmoduloAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idpermisoAC = this.form.controls['idpermisoAC'];
  this.accesoAC = this.form.controls['accesoAC'];
  this.rol_idrolAC = this.form.controls['rol_idrolAC'];
  this.modulo_idmoduloAC = this.form.controls['modulo_idmoduloAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getRol();
      this.getModulo();
      this.getPermisos();
  }

  getRol() {
      this.rolsService.all()
      .subscribe(
          (data: any) => this._rol = data,
      );
  }
  getModulo() {
      this.modulosService.all()
      .subscribe(
          (data: any) => this._modulo = data,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: PermisosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idpermiso: this.idpermiso,
                  acceso: this.acceso,
                  rol_idrol: this.rol_idrol,
                  modulo_idmodulo: this.modulo_idmodulo,
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
   private getPermisos(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.permiso = data;
           },
           error => console.log(error),
           () => console.log('Get permiso complete'));
  }
}
