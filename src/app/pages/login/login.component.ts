import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!:FormGroup

  ngOnInit(){
    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required,Validators.minLength(4),]),
      password: new FormControl('',[Validators.required,Validators.minLength(4),]),
  
    });
  }
onSubmit() {

  console.log(this.loginForm.value);

}

 
}
