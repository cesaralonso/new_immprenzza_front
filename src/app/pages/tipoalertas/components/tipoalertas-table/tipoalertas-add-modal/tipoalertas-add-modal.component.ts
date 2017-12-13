import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TipoalertasService } from './../tipoalertas.service';
import { TipoalertasInterface } from './../tipoalertas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./tipoalertas-add-modal.component.scss')],
  templateUrl: './tipoalertas-add-modal.component.html'
})
export class TipoalertasAddModalComponent extends DialogComponent<TipoalertasInterface, any> implements OnInit {
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idtipoalertaAC: AbstractControl;
  nombreAC: AbstractControl;
  constructor(
    private service: TipoalertasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'idtipoalertaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.idtipoalertaAC = this.form.controls['idtipoalertaAC'];
    this.nombreAC = this.form.controls['nombreAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: TipoalertasInterface): void {
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
