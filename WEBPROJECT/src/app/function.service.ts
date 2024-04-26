import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, map } from 'rxjs';
import { AuthToken, User } from './models';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class FunctionService implements OnInit{

  isLogged : boolean = false

  id:number
  usernameMain:string
  mailMain:string
  image:string

  user: (string)[]

  logged(){
    this.isLogged = true
  }

  BASE_URL = 'http://localhost:8000'

  constructor(private client: HttpClient) {
    this.usernameMain = ""
    this.mailMain = ""
    this.id = 0
    this.user = []
    this.image = ""
    const userStr = localStorage.getItem(USER_KEY);
    if(userStr){
      this.user = JSON.parse(userStr)
    }
    // console.log(this.user)
   }
  ngOnInit(): void {
    // console.log(this.user)
    this.id = Number(this.user[0])
    this.mailMain = this.user[1]
    this.usernameMain = this.user[2]
    this.image = this.user[3]
  }

  login(username: string, password: string): Observable<AuthToken> {
    return this.client.post<AuthToken>(
      `${this.BASE_URL}/api/login/`,
      {username, password}
    ).pipe(
      map(response => {
        const token = response.token;
        const decodedToken = JSON.parse(
          decodeURIComponent(
            atob(token.split('.')[1])
              .split('')
              .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          )
        );
        const user_id = decodedToken.user_id;
        const email = decodedToken.email;
        const username = decodedToken.username;
        const image = decodedToken.last_name
        // const image = decodedToken.last_name;


        if(user_id != this.user[0]){
          this.user = []
        }

        // alert(image)

        // console.log(user_id,email,username)

        if(this.user.length < 5){
          this.user.push(String(user_id))
          this.user.push(email)
          this.user.push(username)
          this.user.push(image)
        }

        localStorage.setItem(USER_KEY, JSON.stringify(this.user));
        this.changeNameMail()

        return { token, user_id, email, username, image };
      })
    );
    
  }
  register(username: string,password: string,email: string):Observable<User>{
    return this.client.post<User>(
      `${this.BASE_URL}/api/register/`,
      {     
        userName:username,
        password:password,
        mail:email,
        image:"https://cdn4.iconfinder.com/data/icons/diversity-v2-0-volume-02/64/burglar-white-male-512.png"
      }
    )
  }

  changeNameMail(){
    this.id = Number(this.user[0])
    this.mailMain = this.user[1]
    this.usernameMain = this.user[2]
    this.image = this.user[3]
  }
  changePicture(profileImage:string){
    return this.client.put(
      `${this.BASE_URL}/api/users/change_profile_pic/${this.id}`,
      {profileImage}
    )
  }


}
