import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, Input } from '@angular/core';
import { HotelService, HotelResponse, Room } from '../../../core/service/hotel.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './items.html',
  styleUrls: ['./items.css'],
})
export class Items implements OnInit {
  @Input() searchTerm: string = '';
  hotels = signal<HotelResponse[]>([]);
  isLoading = true;
  errorMessage = '';

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.loadHotels();
  }

  getAvgPrice(rooms:Room[]){
    let total = 0;
    rooms.forEach(room => {
      total += room.price
    })
    return total / rooms.length;
  }

  get filteredHotels() {
    if (!this.searchTerm) {
      return this.hotels();
    }
    const term = this.searchTerm.toLowerCase();
    return this.hotels().filter(hotel => hotel.name.toLowerCase().includes(term));
  }

  loadHotels(): void {
    this.errorMessage = '';
    this.hotelService.getAllHotels().subscribe({
      next: (res: HotelResponse[]) => {
        this.hotels.set(res)
        this.isLoading = false;
        console.log(this.hotels());
      },
      error: (err) => {
        this.errorMessage = 'Failed to load hotels';
        this.isLoading = false;
      },
    });
  }
}