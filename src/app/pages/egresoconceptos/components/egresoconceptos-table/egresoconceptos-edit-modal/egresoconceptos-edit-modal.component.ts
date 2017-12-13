import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EgresoconceptosService } from './../egresoconceptos.service';
import { EgresoconceptosInterface } from './../egresoconceptos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConceptosService } from './../../../../conceptos/components/conceptos-table/conceptos.service';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./egresoconceptos-edit-modal.component.scss')],
  templateUrl: './egresoconceptos-edit-modal.component.html'
})
export class EgresoconceptosEditModalComponent extends DialogComponent<EgresoconceptosInterface, any> implements OnInit, EgresoconceptosInterface {
  _concepto: string[] = [];

  idegresoconcepto: number;
  fecha: string;
  preciosiniva: number;
  precioconiva: number;
  cantidad: number;
  subtotal: number;
  total: number;
  concepto_concepto: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  egresoconcepto: EgresoconceptosInterface = {
      idegresoconcepto: 0,
      fecha: '',
      preciosiniva: 0,
      precioconiva: 0,
      cantidad: 0,
      subtotal: 0,
      total: 0,
      concepto_concepto: 0,
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
  idegresoconceptoAC: AbstractControl;
  fechaAC: AbstractControl;
  preciosinivaAC: AbstractControl;
  precioconivaAC: AbstractControl;
  cantidadAC: AbstractControl;
  subtotalAC: AbstractControl;
  totalAC: AbstractControl;
  concepto_conceptoAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: EgresoconceptosService,
      private conceptosService: ConceptosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idegresoconceptoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'preciosinivaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'precioconivaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'cantidadAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'subtotalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'totalAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'concepto_conceptoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idegresoconceptoAC = this.form.controls['idegresoconceptoAC'];
  this.fechaAC = this.form.controls['fechaAC'];
  this.preciosinivaAC = this.form.controls['preciosinivaAC'];
  this.precioconivaAC = this.form.controls['precioconivaAC'];
  this.cantidadAC = this.form.controls['cantidadAC'];
  this.subtotalAC = this.form.controls['subtotalAC'];
  this.totalAC = this.form.controls['totalAC'];
  this.concepto_conceptoAC = this.form.controls['concepto_conceptoAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getConcepto();
      this.getEgresoconceptos();
  }

  getConcepto() {
      this.conceptosService.all()
      .subscribe(
          (data: any) => this._concepto = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: EgresoconceptosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idegresoconcepto: this.idegresoconcepto,
                  fecha: this.fecha,
                  preciosiniva: this.preciosiniva,
                  precioconiva: this.precioconiva,
                  cantidad: this.cantidad,
                  subtotal: this.subtotal,
                  total: this.total,
                  concepto_concepto: this.concepto_concepto,
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
   private getEgresoconceptos(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.egresoconcepto = data;
           },
           error => console.log(error),
           () => console.log('Get egresoconcepto complete'));
  }
}
