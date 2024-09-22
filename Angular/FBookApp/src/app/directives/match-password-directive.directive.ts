import { Directive, Input } from '@angular/core';
import { FormGroup, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import Validation from '../helpers/validation';

@Directive({
  selector: '[appMatchPasswordDirective]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchPasswordDirectiveDirective, multi: true }],
  standalone: true
})
export class MatchPasswordDirectiveDirective implements Validator {
  @Input('appMatchPasswordDirective') matchPassword: string[] = [];
  constructor() { }

  validate(formGroup: FormGroup): ValidationErrors | null {
    return Validation.match(this.matchPassword[0], this.matchPassword[1])(formGroup);
  }
}
