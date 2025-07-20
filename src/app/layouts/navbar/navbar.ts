import { Component, input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../core/services/flowbite/flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  host: {
    ngSkipHydration: 'true',
  },
})
export class Navbar implements OnInit {
  constructor(private flowbiteService: Flowbite) {}

  isLogged = input<boolean>(false);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
