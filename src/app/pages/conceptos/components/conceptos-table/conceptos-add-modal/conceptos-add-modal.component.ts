import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ConceptosService } from './../conceptos.service';
import { ConceptosInterface } from './../conceptos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./conceptos-add-modal.component.scss')],
  templateUrl: './conceptos-add-modal.component.html'
})
export class ConceptosAddModalComponent extends DialogComponent<ConceptosInterface, any> implements OnInit {
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idconceptoAC: AbstractControl;
  nombreAC: AbstractControl;
  constructor(
    private service: ConceptosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
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
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: ConceptosInterface): void {
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
