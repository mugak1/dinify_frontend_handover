import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.css'],
    standalone: false
})
export class BasketComponent {
  constructor(public loc: Location) {}
}
