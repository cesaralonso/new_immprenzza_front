import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PuestosService } from './../puestos.service';
import { PuestosInterface } from './../puestos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./puestos-edit-modal.component.scss')],
  templateUrl: './puestos-edit-modal.component.html'
})
export class PuestosEditModalComponent extends DialogComponent<PuestosInterface, any> implements OnInit, PuestosInterface {

  idpuesto: number;
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

  puesto: PuestosInterface = {
      idpuesto: 0,
      nombre: '',
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  idpuestoAC: AbstractControl;
  nombreAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: PuestosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idpuestoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idpuestoAC = this.form.controls['idpuestoAC'];
  this.nombreAC = this.form.controls['nombreAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getPuestos();
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: PuestosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idpuesto: this.idpuesto,
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
   private getPuestos(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.puesto = data;
           },
           error => console.log(error),
           () => console.log('Get puesto complete'));
  }
}
