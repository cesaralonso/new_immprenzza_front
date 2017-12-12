import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PersonasService } from './../personas.service';
import { PersonasInterface } from './../personas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./personas-add-modal.component.scss')],
  templateUrl: './personas-add-modal.component.html'
})
export class PersonasAddModalComponent extends DialogComponent<PersonasInterface, any> implements OnInit {
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  idpersonaAC: AbstractControl;
  nombreAC: AbstractControl;
  edadAC: AbstractControl;
  sexoAC: AbstractControl;
  rfcAC: AbstractControl;
  telefonoAC: AbstractControl;
  domicilioAC: AbstractControl;
  emailAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
    private service: PersonasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'idpersonaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'nombreAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'edadAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'sexoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'rfcAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'telefonoAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'domicilioAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'emailAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'bajaAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_byAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'created_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    'modified_atAC' : ['', Validators.compose([Validators.required, Validators.minLength(1)])],
    });
    this.idpersonaAC = this.form.controls['idpersonaAC'];
    this.nombreAC = this.form.controls['nombreAC'];
    this.edadAC = this.form.controls['edadAC'];
    this.sexoAC = this.form.controls['sexoAC'];
    this.rfcAC = this.form.controls['rfcAC'];
    this.telefonoAC = this.form.controls['telefonoAC'];
    this.domicilioAC = this.form.controls['domicilioAC'];
    this.emailAC = this.form.controls['emailAC'];
    this.bajaAC = this.form.controls['bajaAC'];
    this.created_byAC = this.form.controls['created_byAC'];
    this.created_atAC = this.form.controls['created_atAC'];
    this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: PersonasInterface): void {
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
