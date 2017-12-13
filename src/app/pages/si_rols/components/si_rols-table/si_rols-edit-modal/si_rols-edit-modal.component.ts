import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Si_rolsService } from './../si_rols.service';
import { Si_rolsInterface } from './../si_rols.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./si_rols-edit-modal.component.scss')],
  templateUrl: './si_rols-edit-modal.component.html'
})
export class Si_rolsEditModalComponent extends DialogComponent<Si_rolsInterface, any> implements OnInit, Si_rolsInterface {

  idsi_rol: number;
  nombre: string;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  si_rol: Si_rolsInterface = {
      idsi_rol: 0,
      nombre: '',
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  idsi_rolAC: AbstractControl;
  nombreAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: Si_rolsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idsi_rolAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idsi_rolAC = this.form.controls['idsi_rolAC'];
  this.nombreAC = this.form.controls['nombreAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getSi_rols();
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: Si_rolsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idsi_rol: this.idsi_rol,
                  nombre: this.nombre,
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
   private getSi_rols(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.si_rol = data;
           },
           error => console.log(error),
           () => console.log('Get si_rol complete'));
  }
}
