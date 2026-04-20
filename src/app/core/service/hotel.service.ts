import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './auth.service';

export interface HotelRequest {
  name: string;
  location: string;
  description?: string;
  starRating?: number;
}

export interface HotelResponse {
  id: number;
  name: string;
  location: Location  
  description?: string;
  rooms: Room[]
  starRating?: number;
}

export interface Room{
  id: number;
  capacity: number;
  facilities: Facility[]
  price:number

}

export interface Facility{
  id: number;
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/hotels';

  constructor(private http: HttpClient) {}

  getAllHotels(): Observable<HotelResponse[]> {
    return this.http.get<HotelResponse[]>(this.baseUrl);
  }

  getHotelById(id: number): Observable<HotelResponse> {
    return this.http.get<HotelResponse>(`${this.baseUrl}/${id}`);
  }

  createHotel(request: HotelRequest): Observable<HotelResponse> {
    return this.http.post<HotelResponse>(this.baseUrl, request);
  }

  updateHotel(id: number, request: HotelRequest): Observable<HotelResponse> {
    return this.http.put<HotelResponse>(`${this.baseUrl}/${id}`, request);
  }

  deleteHotel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
