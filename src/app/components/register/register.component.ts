import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService,private _Router:Router,private _FormBuilder:FormBuilder){}

  // registerForm:FormGroup = new FormGroup({
  //   name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  //   email: new FormControl(null,[Validators.required,Validators.email]),
  //   password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)]),
  //   rePassword: new FormControl(null,[Validators.required,Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)]),
  //   phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),

  // });

  registerForm:FormGroup = this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(/^[A-z][a-z0-9]{6,20}$/)]],
    rePassword:[null,[Validators.required]],
    phone: [null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
  
  },{validators:[this.confirmPassword]} as FormControlOptions)

  confirmPassword(group:FormGroup):void{
   let password = group.get("password")
   let rePassword = group.get("rePassword")

   if(rePassword?.value == null || rePassword.value == ''){
    rePassword?.setErrors({required : true})  
   }
   else if(password?.value != rePassword?.value){
    rePassword.setErrors({mismatch:true})
   }
  }

  msgerror:string ='';
  isLoading:boolean = false;

handleForm():void{
 
if(this.registerForm.valid){
  this.isLoading =true;
  this._AuthService.setRegister(this.registerForm.value).subscribe({
    next:(response) =>{
     //  console.log(response);
     if(response.message == 'success'){
      this.isLoading = false;
       this._Router.navigate(['/login'])
       
     }
      
    },
    error:(err:HttpErrorResponse)=> {
      this.isLoading = false;
      console.log(err);
      this.msgerror= err.error.message;

      
    },
   })
}
else{
  this.registerForm.markAllAsTouched();
}
 
}

}
