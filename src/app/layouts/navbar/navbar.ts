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

  isLogged = input<boolean>(false);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }

  signOut() {
    this.userData.deleteToken();
    this.router.navigate(['/login']);
  }
}
