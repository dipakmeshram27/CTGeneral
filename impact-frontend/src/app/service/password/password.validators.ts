import { FormGroup,AbstractControl, ValidationErrors, AsyncValidatorFn,FormControl } from '@angular/forms';

 export class PasswordValidation { 

   
    static mustMatch(control: FormControl): { [s: string]: boolean } {
        if (!control.value.match('newpassword')) {
          //should start with 123
          return { invalidAccountId: true };
        }
      }}
   
    /* static mustMatch(control:AbstractControl) : Promise<ValidationErrors|null>
    {
        console.log('inside the shouldBeUnique Validators');
 
        return new Promise((resolve,reject) =>{
            
                if(control.value !== 'newpassword')
                {
                    console.log("Checking value");
                    resolve({passwordNotMatch:true});
                }
                else{
                    resolve(null);
                }
            
        });
    }
    // submit(){
    //     console.log("hi");
    // }
}
/*static mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}*/

/*static mustMatch(control: FormControl): { [s: string]: boolean } {
    if (!control.value.match('newpassword')) {
      //should start with 123
      return { invalidAccountId: true };
    }
  }*/

  /*static mustMatch(control: AbstractControl) {
    const newpassword: string = control.get('newpassword').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmpassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (newpassword !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }

  
}
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}*/

