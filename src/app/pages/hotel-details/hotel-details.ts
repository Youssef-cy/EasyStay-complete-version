import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HotelService, HotelResponse } from '../../core/service/hotel.service';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hotel-details.html',
  styleUrls: ['./hotel-details.css']
})
export class HotelDetails implements OnInit {
  hotel = signal<HotelResponse | null>(null);
  isLoading = signal(true);
  errorMessage = signal('');

  private route = inject(ActivatedRoute);
  private hotelService = inject(HotelService);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.fetchHotel(Number(id));
      } else {
        this.errorMessage.set('Invalid hotel ID');
        this.isLoading.set(false);
      }
    });
  }

  fetchHotel(id: number) {
    this.isLoading.set(true);
    this.hotelService.getHotelById(id).subscribe({
      next: (res) => {
        this.hotel.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load hotel details.');
        this.isLoading.set(false);
      }
    });
  }
}
