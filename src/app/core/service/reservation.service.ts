import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelResponse } from './hotel.service';
import { RoomResponse } from './room.service';

export interface ReservationRequest {
  hotelId: number;
  roomId: number;
  checkIn: string;
  checkOut: string;  //  2026-05-16T10:30:00
}

export interface ReservationResponse {
  id: number,
  hotel: HotelResponse;
  room: RoomResponse,
  checkIn: Date,
  checkOut: Date
}

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/reservations';

  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<ReservationResponse[]> {
    return this.http.get<ReservationResponse[]>(this.baseUrl);
  }

  createReservation(request: ReservationRequest): Observable<ReservationResponse> {
    return this.http.post<ReservationResponse>(this.baseUrl, request);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
