import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TipotrabajosService } from './../tipotrabajos.service';
import { TipotrabajosInterface } from './../tipotrabajos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./tipotrabajos-add-modal.component.scss')],
  templateUrl: './tipotrabajos-add-modal.component.html'
})
export class TipotrabajosAddModalComponent extends DialogComponent<TipotrabajosInterface, any> implements OnInit {
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
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
    dialogService: DialogService
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
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: TipotrabajosInterface): void {
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
