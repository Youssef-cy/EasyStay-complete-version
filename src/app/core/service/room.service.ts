import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RoomRequest {
  hotelId: number;
  roomNumber: string;
  type?: string;
  pricePerNight: number;
  capacity?: number;
}

export interface RoomResponse {
  id: number;
  hotelId: number;
  roomNumber: string;
  type?: string;
  price: number;
  capacity?: number;
}

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/rooms';

  constructor(private http: HttpClient) {}

  getAllRooms(): Observable<RoomResponse[]> {
    return this.http.get<RoomResponse[]>(this.baseUrl);
  }

  getRoomById(id: number): Observable<RoomResponse> {
    return this.http.get<RoomResponse>(`${this.baseUrl}/${id}`);
  }

  createRoom(request: RoomRequest): Observable<RoomResponse> {
    return this.http.post<RoomResponse>(this.baseUrl, request);
  }

  updateRoom(id: number, request: RoomRequest): Observable<RoomResponse> {
    return this.http.put<RoomResponse>(`${this.baseUrl}/${id}`, request);
  }

  deleteRoom(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
