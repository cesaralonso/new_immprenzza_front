import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { RolsService } from './../rols.service';
import { RolsInterface } from './../rols.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./rols-edit-modal.component.scss')],
  templateUrl: './rols-edit-modal.component.html'
})
export class RolsEditModalComponent extends DialogComponent<RolsInterface, any> implements OnInit, RolsInterface {

  idrol: number;
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

  rol: RolsInterface = {
      idrol: 0,
      nombre: '',
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  idrolAC: AbstractControl;
  nombreAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: RolsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idrolAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idrolAC = this.form.controls['idrolAC'];
  this.nombreAC = this.form.controls['nombreAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getRols();
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: RolsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idrol: this.idrol,
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
   private getRols(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.rol = data;
           },
           error => console.log(error),
           () => console.log('Get rol complete'));
  }
}
