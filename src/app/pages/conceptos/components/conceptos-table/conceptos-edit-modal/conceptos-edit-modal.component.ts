import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ConceptosService } from './../conceptos.service';
import { ConceptosInterface } from './../conceptos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./conceptos-edit-modal.component.scss')],
  templateUrl: './conceptos-edit-modal.component.html'
})
export class ConceptosEditModalComponent extends DialogComponent<ConceptosInterface, any> implements OnInit, ConceptosInterface {

  idconcepto: number;
  nombre: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  concepto: ConceptosInterface = {
      idconcepto: 0,
      nombre: '',
};
  idconceptoAC: AbstractControl;
  nombreAC: AbstractControl;
  constructor(
      private service: ConceptosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'idconceptoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
  });
  this.idconceptoAC = this.form.controls['idconceptoAC'];
  this.nombreAC = this.form.controls['nombreAC'];
  }
  ngOnInit() {
      this.getConceptos();
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: ConceptosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idconcepto: this.idconcepto,
                  nombre: this.nombre,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
   private getConceptos(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.concepto = data;
           },
           error => console.log(error),
           () => console.log('Get concepto complete'));
  }
}
