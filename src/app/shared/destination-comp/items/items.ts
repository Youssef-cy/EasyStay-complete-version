import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HotelService, HotelResponse } from '../../../core/service/hotel.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items.html',
  styleUrls: ['./items.css'],
  // ✅ No providers here
})
export class Items implements OnInit {
  hotels: HotelResponse[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.errorMessage = '';
    this.hotelService.getAllHotels().subscribe({
      next: (res: HotelResponse[]) => {
        this.hotels = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load hotels';
        this.isLoading = false;
      },
    });
  }
}