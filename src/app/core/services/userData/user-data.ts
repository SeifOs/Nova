import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  token: string = '';
  userName: string = '';
  userEmail: string = '';

  getToken(): string {
    return this.token;
  }

  saveToken(t: string): void {
    this.token = t;
    localStorage.setItem('token', this.token);
  }

  saveName(n: string): void {
    this.userName = n;
  }

  getName(): string {
    return this.userName;
  }

  saveEmail(E: string): void {
    this.userEmail = E;
  }

  getEmail(): string {
    return this.userEmail;
  }
}
