import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';
import { Validators, FormControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';



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



  private createForm(): void {
    this.profileForm = this.formBuilder.group({
      nombre: new FormControl('', [Validators.required]),
      DNI: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}[a-zA-Z]')]),
      email: new FormControl('', [Validators.email]),
      fechaAlta: new FormControl(['']),
      fechaBaja: new FormControl('', [Validators.required])
    }, {
      validators: this.fechaBajaValida()
    });

    this.profileForm.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      //verificar si el formulario es valido
      console.log('errors', this.profileForm.errors)

      if (this.profileForm.valid) {
        //realizar el submit del formulario
        this.submit();
      }

    });
  }



  private fechaBajaValida(): ValidatorFn {
    return (): ValidationErrors | null => {
      const fechaA = this.profileForm.get('fechaAlta')?.value;
      const fechaB = this.profileForm.get('fechaBaja')?.value;
      console.log(fechaA, fechaB);


      if (fechaB && fechaA && fechaB < fechaA) {
        return { fechaBajaNoValida: true };
      } else {
        return null;
      }
    };
  }

  public submit() {
    console.log('Submit', this.profileForm.value);

  }

  public getControlError(key: string): { valid: boolean, errors: ValidationErrors[] | any } {
    const formC = this.profileForm.get(key);
    const validation = {
      valid: formC ? (formC.valid || formC.pristine) : false,
      errors: formC ? formC.errors : null,
    }
    return validation;
  }


}
