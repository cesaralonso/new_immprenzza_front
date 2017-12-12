import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TipotrabajosService } from './../tipotrabajos.service';
import { TipotrabajosInterface } from './../tipotrabajos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./tipotrabajos-edit-modal.component.scss')],
  templateUrl: './tipotrabajos-edit-modal.component.html'
})
export class TipotrabajosEditModalComponent extends DialogComponent<TipotrabajosInterface, any> implements OnInit, TipotrabajosInterface {

  idtipotrabajo: number;
  nombre: string;
  largo: number;
  ancho: number;
  publico: number;
  mayoreo: number;
  maquila: number;
  preciopublico: number;
  preciomayoreo: number;
  preciomaquila: number;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  tipotrabajo: TipotrabajosInterface = {
      idtipotrabajo: 0,
      nombre: '',
      largo: 0,
      ancho: 0,
      publico: 0,
      mayoreo: 0,
      maquila: 0,
      preciopublico: 0,
      preciomayoreo: 0,
      preciomaquila: 0,
};
  idtipotrabajoAC: AbstractControl;
  nombreAC: AbstractControl;
  largoAC: AbstractControl;
  anchoAC: AbstractControl;
  publicoAC: AbstractControl;
  mayoreoAC: AbstractControl;
  maquilaAC: AbstractControl;
  preciopublicoAC: AbstractControl;
  preciomayoreoAC: AbstractControl;
  preciomaquilaAC: AbstractControl;
  constructor(
      private service: TipotrabajosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idtipotrabajoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'largoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'anchoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'publicoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'mayoreoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'maquilaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'preciopublicoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'preciomayoreoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'preciomaquilaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idtipotrabajoAC = this.form.controls['idtipotrabajoAC'];
  this.nombreAC = this.form.controls['nombreAC'];
  this.largoAC = this.form.controls['largoAC'];
  this.anchoAC = this.form.controls['anchoAC'];
  this.publicoAC = this.form.controls['publicoAC'];
  this.mayoreoAC = this.form.controls['mayoreoAC'];
  this.maquilaAC = this.form.controls['maquilaAC'];
  this.preciopublicoAC = this.form.controls['preciopublicoAC'];
  this.preciomayoreoAC = this.form.controls['preciomayoreoAC'];
  this.preciomaquilaAC = this.form.controls['preciomaquilaAC'];
  }
  ngOnInit() {
      this.getTipotrabajos();
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: TipotrabajosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idtipotrabajo: this.idtipotrabajo,
                  nombre: this.nombre,
                  largo: this.largo,
                  ancho: this.ancho,
                  publico: this.publico,
                  mayoreo: this.mayoreo,
                  maquila: this.maquila,
                  preciopublico: this.preciopublico,
                  preciomayoreo: this.preciomayoreo,
                  preciomaquila: this.preciomaquila,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
   private getTipotrabajos(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.tipotrabajo = data;
           },
           error => console.log(error),
           () => console.log('Get tipotrabajo complete'));
  }
}
