import { Component, OnInit } from '@angular/core';
import { Filter } from '../../shared/destination-comp/filter/filter';
import { Features } from '../../shared/destination-comp/features/features';
import { Items } from '../../shared/destination-comp/items/items';

@Component({
  selector: 'app-destinations',
  imports: [Filter, Features, Items],
  templateUrl: './destinations.html',
  styleUrl: './destinations.css',
})
export class Destinations  {
  searchTerm: string = '';
}