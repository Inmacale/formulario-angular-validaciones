import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  profileForm: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  public getControlError(key: string): { valid: boolean, errors: ValidationErrors[] | any } {
    const formC = this.profileForm.get(key);
    const validation = {
      valid: formC ? (formC.valid || formC.pristine) : false,
      errors: formC ? formC.errors : null,
    }
    return validation;
  }

  private createForm(): void {
    this.profileForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      DNI: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}[a-zA-Z]')]),
      email: new FormControl('', [Validators.email]),
      fechaAlta: new FormControl(['']),
      fechaBaja: new FormControl([''])
    });
  }



}
