import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookies-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cookies-policy.html',
  styleUrls: ['./cookies-policy.scss']
})
export class CookiesPolicy {
  lastUpdated = '2025-01-27';
}
