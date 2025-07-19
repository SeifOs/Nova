import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../footer/footer';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-blank',
  imports: [RouterOutlet, Footer, Navbar],
  templateUrl: './blank.html',
  styleUrl: './blank.css',
})
export class Blank {}
