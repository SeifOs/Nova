import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../../interfaces/user/iuser';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  token: string | null = null;
  userName: string = '';
  userId: string = '';
  data!: IUser;

  saveToken(t: string): void {
    this.token = t;
    localStorage.setItem('token', this.token);
    this.data = jwtDecode(this.token);
    this.userName = this.data.name;
    this.userId = this.data.id;
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    this.token = null;
    this.userName = '';
  }

  getToken(): string | null {
    return this.token;
  }

  getName(): string {
    return this.userName;
  }

  getId(): string {
    return this.userId;
  }
}
