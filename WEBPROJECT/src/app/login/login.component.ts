import { Component } from '@angular/core';
import { FunctionService } from '../function.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logged: boolean = false;
  username: string = '';
  password: string = '';
  email:string = '';
  isWrong:boolean
  preloader: boolean;


  constructor(private functionService : FunctionService,private router: Router){
    this.isWrong = true
    this.preloader = true;
    this.fetchData().then(() => {
      this.preloader = false;
    });

  }
  private fetchData(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
  login() {
    this.functionService.login(this.username, this.password).subscribe((data) => {
      localStorage.setItem('token', data.token);
      this.logged = true;
      this.username = '';
      this.password = '';
      this.isWrong = false
      this.router.navigate(['/home'])
    });
  }
  register(){
    if(this.username.length != 0){
      if(this.username.length != 0){
        if(this.password.length != 0){
          if(this.password.length > 8){
            if(this.email.length != 0){
              alert("User has been registered!")
            }
            else{
              alert("Set email!")
              return
            }
          }
          else{
            alert("Password lenght must be at least 9!")
            return
          }
        }
        else{
          alert("Set password!")
          return
        }
      }
      else{
        alert("Set username!")
        return
      }
    }
    else{
      alert("Set Password!")
      return
    }
    this.functionService.register(this.username,this.password,this.email).subscribe(()=>{
    });
  }
}
