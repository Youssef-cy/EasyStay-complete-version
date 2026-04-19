import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthenticationRequest {
  email: string;
  password: string;
}

export interface CreateAccountRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  location: string;
}

export interface AuthenticationResponse {
  token: string;
  expiresAt: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) {}

  login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/login`, request);
  }

  signup(request: CreateAccountRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/signup`, request);
  }

  getLocations() {
  return this.http.get<string[]>('https://restcountries.com/v3.1/all');
  }
}
