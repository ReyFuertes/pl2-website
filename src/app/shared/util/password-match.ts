import { AbstractControl, ValidationErrors } from '@angular/forms';

export function matchValues(confirmNewPassword: string): (AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    return !!control?.parent &&
      !!control?.parent.value &&
      control?.value === control?.parent?.controls[confirmNewPassword]?.value
      ? null
      : { isMatching: false };
  };
}