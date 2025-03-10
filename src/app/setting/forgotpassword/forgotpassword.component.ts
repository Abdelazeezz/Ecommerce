import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/shared/services/forgot-password.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  constructor(private _FormBuilder:FormBuilder,
    private _ForgotPasswordService:ForgotPasswordService,
  private _Router:Router
  ){}
  

  step1:boolean =true;
  step2:boolean =false;
  step3:boolean =false;
  userMsg:string ='';
  email:string ='';

  forgotForm:FormGroup = this._FormBuilder.group({
    email:['',[Validators.required,Validators.email]],
  })

  resetCodeForm:FormGroup = this._FormBuilder.group({
    resetCode:['',Validators.pattern('^\d{6}$')]
  })

  resetPassword:FormGroup = this._FormBuilder.group({
   newPassword:['']
  })


  forgotPassword():void{
    let userEmail = this.forgotForm.value
    this.email = userEmail.email;
    // console.log(userEmail);
    
this._ForgotPasswordService.forgotPassword(userEmail).subscribe({
  next:(response)=>{
    console.log(response);
    this.userMsg = response.message;
    this.step1 = false;
    this.step2 = true;
 
    
  },
  error:(err)=>{
    console.log(err);
    this.userMsg = err.error.message;
    
  }
})
    
  }
  resetCode():void{
    let resetCode = this.resetCodeForm.value;
    this._ForgotPasswordService.resetCode(resetCode).subscribe({
      next:(response)=>{
        this.userMsg = response.status
        this.step2 = false;
        this.step3 = true;
      },
      error:(err)=>{
        this.userMsg = err.error.message;
      }
    }) 
  }
  newPassword():void{
    let resetForm = this.resetPassword.value;
    resetForm.email = this.email;
    this._ForgotPasswordService.resetPassword(resetForm).subscribe({
      next:(response)=>{
        if(response.token){
          localStorage.setItem('etoken',response.token)
          this._Router.navigate(['/home'])
        }
        
      },
      error:(err)=> {
        this.userMsg = err.error.message;
      },
    })
  }
  
}
