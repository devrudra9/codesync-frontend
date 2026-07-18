import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from '../models/current-user';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private readonly STORAGE_KEY = 'currentUser';

  private readonly currentUserSubject = new BehaviorSubject<CurrentUser | null>(this.loadUser());

  readonly currentUser$: Observable<CurrentUser | null> = this.currentUserSubject.asObservable();

  getCurrentUser(): CurrentUser | null {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: CurrentUser): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));

    this.currentUserSubject.next(user);
  }

  clearCurrentUser(): void {
    localStorage.removeItem(this.STORAGE_KEY);

    this.currentUserSubject.next(null);
  }

  private loadUser(): CurrentUser | null {
    const user = localStorage.getItem(this.STORAGE_KEY);

    return user ? JSON.parse(user) : null;
  }
}
