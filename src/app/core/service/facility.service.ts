import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FacilityRequest {
  name: string;
  description?: string;
}

export interface FacilityResponse {
  id: number;
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/facilities';

  constructor(private http: HttpClient) {}

  getAllFacilities(): Observable<FacilityResponse[]> {
    return this.http.get<FacilityResponse[]>(this.baseUrl);
  }

  getFacilityById(id: number): Observable<FacilityResponse> {
    return this.http.get<FacilityResponse>(`${this.baseUrl}/${id}`);
  }

  createFacility(request: FacilityRequest): Observable<FacilityResponse> {
    return this.http.post<FacilityResponse>(this.baseUrl, request);
  }

  updateFacility(id: number, request: FacilityRequest): Observable<FacilityResponse> {
    return this.http.put<FacilityResponse>(`${this.baseUrl}/${id}`, request);
  }

  deleteFacility(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
