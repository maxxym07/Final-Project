import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  switch: boolean;
  urlName: string;

  firstName: string ='';
  secondName: string = '';
  phone:any;
  email: string = '';
  password: string = '';

  checkName = /[A-Za-z]{2,20}/;
  checkSName = /[A-Za-z]{2,20}/;
  checkEmail = /^[\w\.\-]{1,}@\w{1,}\.\w{2,7}$/;
  checkPhone = /^\d{10}$/;
  checkPassword: RegExp = /^[0-9A-Za-z]{8,}$/;

  constructor(private authService: AuthService,) { }

  ngOnInit(): void {
    this.updateCheckUser();
    this.checkUser();
  }

  switchForm(): void{
    this.switch=!this.switch
  }

  loginUser(): void{
    if (this.email != '' && this.password != '') {
        this.authService.signIn(this.email, this.password);
       this.reset()
      }
     else {
      alert('Заповніть усі поля')
    }
  }

  registerUser(): void {
    if (this.checkName.test(this.firstName)) {
      if (this.checkSName.test(this.secondName)){
        if (this.checkPhone.test(this.phone)) {
          if (this.checkEmail.test(this.email)) {
            if (this.checkPassword.test(this.password)) {
              this.authService.signUp(this.email, this.password, this.firstName,this.secondName, this.phone);
              this.reset();
            }
            else {
              alert('Пароль має бути від 8 символів')
            }
          }
          else {
            alert('Заповніть коректно поле "Email"')
          }
        }
        else {
          alert('Заповніть коректно поле "Телефон"')
        }
      }
      else {
        alert('Заповніть коректно поле "Прізвище"')
      }
    }
    else {
      alert('Заповніть коректно поле "Імя"')
    }

  }

  private updateCheckUser(): void{
    this.authService.userStatus.subscribe(
      () => {
        this.checkUser();
      }
    )
  }

  private checkUser():void{
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      if (user.role === 'admin') {
        this.urlName = 'admin';
      this.switch = true;
        
      }
      else if (user.role === 'user') {
        this.urlName = 'profile';
      this.switch = true; 
      }
    }
    else {
      this.switch = false;
      this.urlName = '';
    }
  }

  reset() {
    this.firstName = '';
    this.secondName = '';
    this.phone=undefined;
     this.email = '';
     this.password = '';
   }
}
