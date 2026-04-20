import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService, ReservationResponse } from '../../core/service/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css']
})
export class Bookings implements OnInit {
  reservations = signal<ReservationResponse[]>([]);
  isLoading = signal(true);
  errorMessage = signal('');

  private reservationService = inject(ReservationService);

  ngOnInit() {
    this.fetchBookings();
  }

  fetchBookings() {
    this.isLoading.set(true);
    this.reservationService.getAllReservations().subscribe({
      next: (res) => {
        this.reservations.set(res);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to load bookings.');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }

  deleteBooking(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this reservation!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservationService.deleteReservation(id).subscribe({
          next: () => {
            this.reservations.set(this.reservations().filter(res => res.id !== id));
            Swal.fire('Deleted!', 'Your reservation has been deleted.', 'success');
          },
          error: (err) => {
            Swal.fire('Error!', 'Failed to delete the reservation.', 'error');
            console.error(err);
          }
        });
      }
    });
  }
}
