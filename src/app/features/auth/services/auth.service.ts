import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { LoginRequest } from '../models/login-request';
import { SignupRequest } from '../models/signup-request';
import { AuthResponse } from '../models/auth-response';

import { TokenService } from '../../../core/services/token.service';
import { API_ENDPOINTS } from '../../../core/constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenService = inject(TokenService);

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}${API_ENDPOINTS.AUTH.LOGIN}`, request)
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.token);
        }),
      );
  }

  signup(request: SignupRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}${API_ENDPOINTS.AUTH.SIGNUP}`, request)
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.token);
        }),
      );
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  getToken(): string | null {
    return this.tokenService.getToken();
  }

  isAuthenticated(): boolean {
    return this.tokenService.isLoggedIn();
  }
}
