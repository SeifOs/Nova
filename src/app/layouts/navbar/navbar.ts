import { IsBrowser } from './../../core/services/isBrowser/is-browser';
import { Component, inject, input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Flowbite } from '../../core/services/flowbite/flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserData } from '../../core/services/userData/user-data';

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
  private readonly flowbiteService = inject(Flowbite);
  private readonly router = inject(Router);
  private readonly userData = inject(UserData);
  private readonly isBrowser = inject(IsBrowser);

  isLogged = input<boolean>(false);
  isDarkMode: boolean = false;

  ngOnInit(): void {
    if (this.isBrowser.isBrowser()) {
      if (localStorage.getItem('isDarkMode') != null) {
        this.isDarkMode = localStorage.getItem('isDarkMode') == 'true';
        if (this.isDarkMode) {
          document.documentElement.classList.add('dark');
        }
      }
    }

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  toggleDarkMode() {
    if (!this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('isDarkMode', this.isDarkMode.toString());
  }

  signOut() {
    this.userData.deleteToken();
    this.router.navigate(['/login']);
  }
}
