import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator to check if password and confirm password fields match
export function mustMatch(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(password);
    const confirmPasswordControl = control.get(confirmPassword);

    if (!passwordControl || !confirmPasswordControl) {
        console.log("case1");
      return null;
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors.mustMatch) {
        console.log("case2");
      // return if another validator has already found an error on the confirmPasswordControl
      return null;
    }

    // set error on confirmPasswordControl if validation fails
    if (passwordControl.value !== confirmPasswordControl.value) {
        console.log("case3");
      confirmPasswordControl.setErrors({ mustMatch: true });
    } else {
        console.log("case4");
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}
