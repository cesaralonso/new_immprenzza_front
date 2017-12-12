import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PersonasService } from './../personas.service';
import { PersonasInterface } from './../personas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./personas-edit-modal.component.scss')],
  templateUrl: './personas-edit-modal.component.html'
})
export class PersonasEditModalComponent extends DialogComponent<PersonasInterface, any> implements OnInit, PersonasInterface {

  idpersona: number;
  nombre: string;
  edad: number;
  sexo: string;
  rfc: string;
  telefono: number;
  domicilio: string;
  email: string;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  id: number;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  persona: PersonasInterface = {
      idpersona: 0,
      nombre: '',
      edad: 0,
      sexo: '',
      rfc: '',
      telefono: 0,
      domicilio: '',
      email: '',
      baja: false,
      created_by: 0,
      created_at: '',
      modified_at: '',
};
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
      dialogService: DialogService,
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
      this.getPersonas();
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: PersonasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idpersona: this.idpersona,
                  nombre: this.nombre,
                  edad: this.edad,
                  sexo: this.sexo,
                  rfc: this.rfc,
                  telefono: this.telefono,
                  domicilio: this.domicilio,
                  email: this.email,
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
   private getPersonas(): void {
       this.service.findById(this.id)
           .subscribe( data => {
                 this.persona = data;
           },
           error => console.log(error),
           () => console.log('Get persona complete'));
  }
}
