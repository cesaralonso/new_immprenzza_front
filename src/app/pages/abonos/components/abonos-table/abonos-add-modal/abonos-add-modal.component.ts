import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { AbonosService } from './../abonos.service';
import { AbonosInterface } from './../abonos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdensService } from './../../../../ordens/components/ordens-table/ordens.service';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./abonos-add-modal.component.scss')],
  templateUrl: './abonos-add-modal.component.html'
})
export class AbonosAddModalComponent extends DialogComponent<AbonosInterface, any> implements OnInit {
  _orden: string[] = [];
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idabonoAC: AbstractControl;
  cantidadAbonadaAC: AbstractControl;
  fechaAC: AbstractControl;
  cantidadRestanteAC: AbstractControl;
  orden_idordenAC: AbstractControl;
  statusAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
    private service: AbonosService,
      private ordensService: OrdensService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'idabonoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'cantidadAbonadaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'fechaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'cantidadRestanteAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'orden_idordenAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'statusAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.idabonoAC = this.form.controls['idabonoAC'];
    this.cantidadAbonadaAC = this.form.controls['cantidadAbonadaAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.cantidadRestanteAC = this.form.controls['cantidadRestanteAC'];
    this.orden_idordenAC = this.form.controls['orden_idordenAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.bajaAC = this.form.controls['bajaAC'];
    this.created_byAC = this.form.controls['created_byAC'];
    this.created_atAC = this.form.controls['created_atAC'];
    this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getOrden();
  }
  getOrden() {
      this.ordensService.all()
      .subscribe(
          (data: any) => this._orden = data,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: AbonosInterface): void {
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
