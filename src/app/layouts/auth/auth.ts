import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, Navbar],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {}
