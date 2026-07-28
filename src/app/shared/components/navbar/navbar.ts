import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CurrentUserService } from '../../../core/services/current-user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly currentUserService = inject(CurrentUserService);

  readonly currentUser$ = this.currentUserService.currentUser$;

  showProfile = false;

  toggleProfile(): void {
    this.showProfile = !this.showProfile;
  }
}
