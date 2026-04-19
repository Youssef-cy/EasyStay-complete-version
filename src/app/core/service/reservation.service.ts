import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReservationRequest {
  roomId: number;
  checkInDate: string;   // ISO date string, e.g. "2025-06-01"
  checkOutDate: string;  // ISO date string, e.g. "2025-06-05"
}

export interface ReservationResponse {
  id: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  status?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/reservations';

  constructor(private http: HttpClient) {}

  getAllReservations(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(this.baseUrl);
  }

  createReservation(request: ReservationRequest): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(this.baseUrl, request);
  }
}
