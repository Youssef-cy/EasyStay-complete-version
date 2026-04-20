import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservationService, ReservationRequest } from '../../core/service/reservation.service';
import Swal from 'sweetalert2';

const dateRangeValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const checkIn = group.get('checkInDate')?.value;
  const checkOut = group.get('checkOutDate')?.value;
  if (checkIn && checkOut) {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    return outDate > inDate ? null : { invalidDateRange: true };
  }
  return null;
};

@Component({
  selector: 'app-book-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './book-room.html',
  styleUrls: ['./book-room.css']
})
export class BookRoom implements OnInit {
  bookingForm: FormGroup;
  roomId!: number;
  hotelId!: number;
  isLoading = false;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private reservationService = inject(ReservationService);

  constructor() {
    this.bookingForm = this.fb.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required]
    }, { validators: dateRangeValidator });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('roomId');
      if (id) {
        this.roomId = Number(id);
      } else {
        Swal.fire('Error', 'Invalid Room ID', 'error').then(() => this.router.navigate(['/destinations']));
      }
    });

    this.route.queryParamMap.subscribe(qParams => {
      const hId = qParams.get('hotelId');
      if (hId) {
        this.hotelId = Number(hId);
      }
    });
  }

  get invalidDateRange(): boolean {
    return !!this.bookingForm.errors?.['invalidDateRange'] &&
      (this.bookingForm.get('checkOutDate')?.touched || this.bookingForm.get('checkInDate')?.touched || false);
  }

  formatDate(dateStr: string): string {
    if (dateStr.length === 16) {
      return dateStr + ':00';
    }
    return dateStr;
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formVal = this.bookingForm.value;

    const request: ReservationRequest = {
      roomId: this.roomId,
      checkIn: this.formatDate(formVal.checkInDate),
      checkOut: this.formatDate(formVal.checkOutDate),
      hotelId: this.hotelId
    };

    this.reservationService.createReservation(request).subscribe({
      next: (res) => {
        console.log(res);

        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Room Booked!',
          text: 'Your reservation was successful.',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          history.back();
        });
      },
      error: (err) => {
        console.log(err);

        this.isLoading = false;
        const msg = err?.error?.message || 'Failed to book the room.';
        Swal.fire('Booking Failed', msg, 'error');
      }
    });
  }
}
