import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder, ValidationErrors } from '@angular/forms'; 
import { Router } from '@angular/router';
import {PasswordValidation} from 'src/app/service/password/password.validators';
import { ChangePassword } from '../../model/changepassword';
import { UserService } from '../../service/user/user-service';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

 form: FormGroup;

 submitted=false;

  
   ngOnInit(): void {
  }
  constructor( private formBuilder: FormBuilder, private userService: UserService, private router: Router) { 
  
  this.form = this.formBuilder.group({
    oldpassword : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    newpassword : new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    confirmpassword : new FormControl('',[Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]
         )},{
           validators: this.mustMatch('newpassword','confirmpassword')
         });

        }
          mustMatch(controlname:string, matchingcontrolname:string){
            return(formGroup:FormGroup)=>{
              const control=formGroup.controls[controlname]
              const matchingcontrol=formGroup.controls[matchingcontrolname]
        
              if(matchingcontrol.errors && !matchingcontrol.errors.mustmatch){
                return
              }
              if(control.value != matchingcontrol.value){
                matchingcontrol.setErrors({mustmatch:true})
                console.log("Not Matched")
              }
              else{
                matchingcontrol.setErrors(null)
                console.log(" Matched")
              }
            }
          }
        
         /*  mustMatch(form: FormGroup) {
            const { value: newpassword } = form.get('newpassword');
            const { value: confirmPassword } = form.get('confirmpassword');
            return console.log(newpassword === confirmPassword ? null : { passwordNotMatch: true }) ;
          }

          passwordsShouldMatch(form: FormGroup) {
            return this.form.get('newpassword').value === this.form.get('confirmpassword').value
              ? null : {'mismatch': true};
          }*/
        
      
          get oldpassword(){
            return this.form.get('oldpassword');
          }
          get newpassword(){
            return this.form.get('newpassword');
          }
        get confirmpassword(){
         // return this.form.controls['newpassword'].value
        // return this.form.controls['confirmpassword'].value;
          
         return this.form.get('confirmpassword');
          //return this.form.get('newpassword').value === this.form.get('confirmpassword').value
          }

          get f() { return this.form.controls; } 
 
          submit() {
            console.log(this.form.value);
            this.submitted = true;
            if (this.form.invalid) {
              return;
            } else {
        
              let changePassword: ChangePassword = this.form.value;
        
              this.userService.changePassword(changePassword).subscribe(value => {
               
               
               
               
              
              
               
                this.router.navigate(['/']);
                console.log(value);
                console.log(this.form.value);
              })
            }}
          }
  /*form: FormGroup;
    touched = false;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
          oldpassword : ['',Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
          newpassword : ['',Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')],
          confirmpassword : ['',Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]},
       // {
         //   validator: MustMatch('password', 'confirmPassword')
        //}
        );
    }
    
    
    get oldpassword(){
      return this.form.get('oldpassword');
    }
    get newpassword(){
      return this.form.get('newpassword');
    }
    get confirmpassword(){
      return this.form.get('confirmpassword');
    }
   
    submit() {
      this.touched = true;
      console.log(this.form.value);

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

    }*/

