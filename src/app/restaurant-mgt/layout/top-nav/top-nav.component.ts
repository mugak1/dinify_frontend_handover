import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './top-nav.component.html',
})
export class TopNavComponent {
  @Output() menuClick = new EventEmitter<void>();
  @Output() logoutClick = new EventEmitter<void>();

  baseUrl = environment.apiUrl;

  constructor(public auth: AuthenticationService) {}
}
