import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { }
// this is use for sign in 
  signIn() { 
    return this.http.get(environment.apiPath +'user');
  }
// this is user for sign up
 signUp(data:any) {
  return this.http.post(environment.apiPath +'user', data);
 }
}
