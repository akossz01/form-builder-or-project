import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  //register post request koviket varja name, email,password a bodyban
  //sikeres regisztracio eseten vissa ad egy tokent amit el kell taroljunk a local storageban

  async login (_email: String, _password: String){
    try {
      const response = await fetch('http://141.147.42.101/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: _email, password: _password })
      });
  
      if (!response.ok) {
        // If response is not OK (status code is not in the range 200-299)
        throw new Error('Login failed');
      }
  
      const data = await response.json(); // Parse response body as JSON
      const token = data.token; // Assuming the token is in the response data
  
      console.log('Login successful. Token:', token);
      
      return token;
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Rethrow the error to handle it outside this function if needed
    }
    
  }
}
