import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  //register post request koviket varja name, email,password a bodyban
  //sikeres regisztracio eseten vissa ad egy tokent amit el kell taroljunk a local storageban

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post<any>('http://141.147.42.101/auth/login', { email, password }).toPromise();
      const token = response.token;
      console.log(response);
      
      if (token) {
        localStorage.setItem('token', token);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false; // Login failed
    }
  }

  async register(name: string, email:string, password: string): Promise<boolean> {
    try {
      const response = await this.http.post<any>('http://141.147.42.101/auth/register', { name, email, password }).toPromise();
      const token = response.token;
      console.log(response);
      
       if(token){
        localStorage.setItem('token', token);
        return true;
      }  
      return false;
    } catch (error) {
      console.error('Register error:', error);
      return false; // register failed
    }
  }
  
  isAuthenticated(): boolean {
    // Check if token exists in localStorage
    return !!localStorage.getItem('token');
  }

  logout(): void {
    // Remove token from localStorage
    localStorage.removeItem('token');
  }
}
